import React, { useState } from "react";
import WaypointInput from "../components/AutocompleteInput/AutocompleteInput";
import DropoffRow from "../components/DropoffRow/DropoffRow";
import PickupRow from "../components/PickupRow/PickupRow";
import "../utils/styles/styles.css";

// Shared data structure for pickups/dropoffs
interface LocationData {
    location: string;
    item: string;
    scu: number;
}

interface Contract {
    id: number;
    pickups: LocationData[];
    dropoffs: LocationData[];
}

export default function Home() {
    const [contracts, setContracts] = useState<Contract[]>([
        {
            id: 0,
            pickups: [{ location: "", item: "", scu: 0 }],
            dropoffs: [{ location: "", item: "", scu: 0 }],
        },
    ]);

    const addContract = () => {
        setContracts([
            ...contracts,
            {
                id: contracts.length,
                pickups: [{ location: "", item: "", scu: 0 }],
                dropoffs: [{ location: "", item: "", scu: 0 }],
            },
        ]);
    };

    const removeContract = (id: number) => {
        if (contracts.length === 1) return; // ensure at least 1
        setContracts(contracts.filter((c) => c.id !== id));
    };

    const updatePickup = (contractId: number, idx: number, data: LocationData) => {
        setContracts((prev) =>
            prev.map((c) =>
                c.id === contractId
                    ? {
                        ...c,
                        pickups: c.pickups.map((p, i) => (i === idx ? data : p)),
                    }
                    : c
            )
        );
    };

    const updateDropoff = (contractId: number, idx: number, data: LocationData) => {
        setContracts((prev) =>
            prev.map((c) =>
                c.id === contractId
                    ? {
                        ...c,
                        dropoffs: c.dropoffs.map((d, i) => (i === idx ? data : d)),
                    }
                    : c
            )
        );
    };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
        startLocation,   // make sure you track this with useState
        contracts,       // this is your existing state
    };

    try {
        const res = await fetch("http://127.0.0.1:5000/api/contracts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const data = await res.json();
        console.log("Server response:", data);
    } catch (err) {
        console.error("Error submitting contracts:", err);
    }
};

    const [startLocation, setStartLocation] = useState("");

    return (
        <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}
        >
            {/* Starting Location */}
            <h2>Starting Location</h2>
        <WaypointInput
            apiUrl="http://127.0.0.1:5000/api/waypoints"
            placeholder="Select Your Starting Location"
            value={startLocation}
            onChange={(val) => setStartLocation(val)}
        />

            {/* Contracts */}
            <h2>Contracts</h2>
            {contracts.map((contract, contractIdx) => (
                <div
                    key={contract.id}
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: 8,
                        padding: 20,
                        marginBottom: 20,
                        backgroundColor: "#1a1a1a",
                    }}
                >
                    <h3>Contract {contractIdx + 1}</h3>

                    {/* Pickups */}
                    <h4>Pickups</h4>
                    {contract.pickups.map((pickup, idx) => (
                        <PickupRow
                            key={idx}
                            index={idx}
                            data={pickup}
                            onChange={(updated) => updatePickup(contract.id, idx, updated)}
                            onRemove={() =>
                                setContracts((prev) =>
                                    prev.map((c) =>
                                        c.id === contract.id
                                            ? {
                                                ...c,
                                                pickups: c.pickups.filter((_, i) => i !== idx),
                                            }
                                            : c
                                    )
                                )
                            }
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setContracts((prev) =>
                                prev.map((c) =>
                                    c.id === contract.id
                                        ? {
                                            ...c,
                                            pickups: [
                                                ...c.pickups,
                                                { location: "", item: "", scu: 0 },
                                            ],
                                        }
                                        : c
                                )
                            )
                        }
                    >
                        ➕ Add Pickup
                    </button>

                    {/* Dropoffs */}
                    <h4>Dropoffs</h4>
                    {contract.dropoffs.map((dropoff, idx) => (
                        <DropoffRow
                            key={idx}
                            index={idx}
                            data={dropoff}
                            onChange={(updated) => updateDropoff(contract.id, idx, updated)}
                            onRemove={() =>
                                setContracts((prev) =>
                                    prev.map((c) =>
                                        c.id === contract.id
                                            ? {
                                                ...c,
                                                dropoffs: c.dropoffs.filter((_, i) => i !== idx),
                                            }
                                            : c
                                    )
                                )
                            }
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setContracts((prev) =>
                                prev.map((c) =>
                                    c.id === contract.id
                                        ? {
                                            ...c,
                                            dropoffs: [
                                                ...c.dropoffs,
                                                { location: "", item: "", scu: 0 },
                                            ],
                                        }
                                        : c
                                )
                            )
                        }
                    >
                        ➕ Add Dropoff
                    </button>
                    <br />
                    {/* Remove Contract */}
                    <button
                        type="button"
                        style={{ marginTop: 10 }}
                        onClick={() => removeContract(contract.id)}
                    >
                        ❌ Remove Contract
                    </button>
                </div>
            ))}

            {/* Add Contract Button */}
            <button type="button" onClick={addContract} style={{ marginBottom: 20 }}>
                ➕ Add Contract
            </button>

            {/* Submit */}
            <button type="submit" style={{ marginTop: 20 }}>
                🚀 Apply
            </button>
        </form>
    );
}
