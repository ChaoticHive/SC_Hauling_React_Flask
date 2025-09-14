from logging import Logger
from flask import Flask, send_from_directory, jsonify, request
import json
import os
from flask_cors import CORS
from utils.RoutePlanner import process_contracts

app = Flask(__name__, static_folder="../sc_hauling_frontend/app", static_url_path="/")
# CORS(app)  # Enable CORS for all routes
CORS(app, resources={
    r"/api/*": {
        "origins": ["http://localhost:8081"],
        # Restrict to specific methods and headers if needed
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type"]
    }
})
logger = Logger("sc_hauling_backend")
# @app.route('/')
# def home():
#     return send_from_directory(app.static_folder, 'index.html')


@app.route('/api/waypoints', methods=["GET"])
def waypoints():
    json_path = os.path.join(os.path.dirname(__file__), 'data', 'stanton_locations.json')
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    names = sorted({entry["Waypoint Name"] for entry in data if entry.get("Waypoint Name")})
    return jsonify(names)

@app.route('/api/items', methods=["GET"])
def items():
    items_list = ["Scrap", "Medical Supplies", "Food", "Minerals"]
    return jsonify(items_list)

@app.route('/api/contracts', methods=["POST"])
def contracts():
    try:
        data = request.get_json()
        print(f"Received data: {data}")
        
        # Process the data and generate contracts
        if "startLocation" not in data:
            return jsonify({"error": "Missing 'startLocation' key"}), 400
        if "contracts" not in data:
            return jsonify({"error": "Missing 'contracts' key"}), 400

        start_location = data["startLocation"]
        contracts = data["contracts"]

        print(f"Start Location: {start_location}")
        print(f"Contracts: {contracts}")
        # Call the RoutePlanner to process contracts
        result = process_contracts(data)
        print(f"RoutePlanner result: {result}")
        # Return a structured response
        return jsonify({
            "status": "success",
            "message": "Contracts received and processing",
            "startLocation": start_location,
            "contracts": contracts
        }), 200
        
    except Exception as e:
        logger.error(f"Error processing contracts: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)  # accessible on LAN
    
