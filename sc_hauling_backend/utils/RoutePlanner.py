import json
import math
import os
from itertools import permutations
import logging
from collections import defaultdict

logging.basicConfig(level=logging.DEBUG)

# Load location data with xyz coordinates
with open(os.path.join(os.path.dirname(__file__), "../data/stanton_locations.json")) as f:
    LOCATIONS = json.load(f)

def get_position(location_name: str, LOCATIONS: list):
    """
    Look up a location by name in LOCATIONS (list of dicts) and return (x, y, z).
    """
    for loc in LOCATIONS:
        if loc.get("Waypoint Name", "").lower() == location_name.lower():
            x = loc["Cartesian Coordinate X"]
            y = loc["Cartesian Coordinate Y"]
            z = loc["Cartesian Coordinate Z"]
            return (x, y, z)
    raise ValueError(f"Location '{location_name}' not found in LOCATIONS")

def distance_3d(a: tuple, b: tuple) -> float:
    """
    Calculate the Euclidean distance between two locations in 3D space.
    """
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2)

def route_distance(locations: list, LOCATIONS: dict) -> float:
    """
    Calculate the total distance of a route given a list of location names.
    """
    total_distance = 0.0
    for i in range(len(locations) - 1):
        pos_a = get_position(locations[i], LOCATIONS)
        pos_b = get_position(locations[i + 1], LOCATIONS)
        total_distance += distance_3d(pos_a, pos_b)
    return total_distance

def optimize_route_3d(locations: list, LOCATIONS: dict) -> list:
    """
    Find the shortest route through the given locations (naive permutation approach).
    """
    if len(locations) <= 1:
        return locations

    best_distance = float('inf')
    best_order = []

    # Skip first location (starting point)
    start = locations[0]
    rest = locations[1:]

    for perm in permutations(rest):
        candidate = [start] + list(perm)
        dist = route_distance(candidate, LOCATIONS)
        if dist < best_distance:
            best_distance = dist
            best_order = candidate

    return best_order

def can_add_contract(trip: dict, contract: dict, scu_limit: int) -> bool:
    """
    Check if the contract can fit into the current trip respecting SCU limit.
    """
    total_scu = sum(p["scu"] for p in contract["pickups"])
    return (trip["scuUsed"] + total_scu) <= scu_limit


def add_contract_to_trip(trip: dict, contract: dict):
    """
    Add pickups and dropoffs of a contract to the current trip.
    """
    trip["pickups"].extend(contract["pickups"])
    trip["dropoffs"].extend(contract["dropoffs"])
    trip["scuUsed"] += sum(p["scu"] for p in contract["pickups"])


def finalize_trip(trip: dict, start_location: str, LOCATIONS: dict) -> dict:
    """
    Compute optimized route for the trip and return updated trip.
    """
    locations = [p["location"] for p in trip["pickups"]] + [d["location"] for d in trip["dropoffs"]]
    if not locations:
        trip["route"] = []
        return trip
    # Prepend start location for first trip
    locations = [start_location] + locations
    trip["route"] = optimize_route_3d(locations, LOCATIONS)
    return trip


def process_contracts(payload: dict) -> dict:
    """
    Main function: process all contracts and return optimized trips
    """
    start_location = payload["startLocation"]
    scu_limit = payload.get("scuLimit", 9999999)
    contracts_list = payload.get("contracts", [])

    trips = []
    current_trip = {"scuUsed": 0, "pickups": [], "dropoffs": []}

    for contract in contracts_list:
        if not can_add_contract(current_trip, contract, scu_limit):
            # finalize current trip
            trips.append(finalize_trip(current_trip, start_location, LOCATIONS))
            # start new trip
            current_trip = {"scuUsed": 0, "pickups": [], "dropoffs": []}

        add_contract_to_trip(current_trip, contract)

    # finalize last trip
    if current_trip["pickups"] or current_trip["dropoffs"]:
        trips.append(finalize_trip(current_trip, start_location, LOCATIONS))

    return {
        "startLocation": start_location,
        "trips": trips
    }