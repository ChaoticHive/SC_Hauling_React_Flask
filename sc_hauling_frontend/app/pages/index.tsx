import React, { useState } from "react";
import WaypointInput from "../components/AutocompleteInput/AutocompleteInput";
import DropoffRow from "../components/DropoffRow/DropoffRow";
import PickupRow from "../components/PickupRow/PickupRow";
import "../utils/styles/styles.css";

interface Contract {
    id: number;
    pickups: number[];
    dropoffs: number[];
}

export default function Home() {
    const [contracts, setContracts] = useState<Contract[]>([
        { id: 0, pickups: [0], dropoffs: [0] },
    ]);

    const addContract = () => {
        setContracts([
            ...contracts,
            { id: contracts.length, pickups: [0], dropoffs: [0] },
        ]);
    };

    const removeContract = (id: number) => {
        if (contracts.length === 1) return; // minimum 1 contract
        setContracts(contracts.filter((c) => c.id !== id));
    };

    return (
        <form style={{ maxWidth: 800, margin: "0 auto", padding: 20 }}>
            {/* Starting Location */}
            <h2>Starting Location</h2>
            <WaypointInput
                apiUrl="http://127.0.0.1:5000/api/waypoints"
                placeholder="Select Your Starting Location"
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
                    {contract.pickups.map((id, idx) => (
                        <PickupRow
                            key={id}
                            index={idx}
                            onRemove={() => {
                                const updated = contracts.map((c) =>
                                    c.id === contract.id
                                        ? {
                                            ...c,
                                            pickups: c.pickups.filter((_, i) => i !== idx),
                                        }
                                        : c
                                );
                                setContracts(updated);
                            }}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            const updated = contracts.map((c) =>
                                c.id === contract.id
                                    ? { ...c, pickups: [...c.pickups, c.pickups.length] }
                                    : c
                            );
                            setContracts(updated);
                        }}
                    >
                        ➕ Add Pickup
                    </button>

                    {/* Dropoffs */}
                    <h4>Dropoffs</h4>
                    {contract.dropoffs.map((id, idx) => (
                        <DropoffRow
                            key={id}
                            index={idx}
                            onRemove={() => {
                                const updated = contracts.map((c) =>
                                    c.id === contract.id
                                        ? {
                                            ...c,
                                            dropoffs: c.dropoffs.filter((_, i) => i !== idx),
                                        }
                                        : c
                                );
                                setContracts(updated);
                            }}
                        />
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            const updated = contracts.map((c) =>
                                c.id === contract.id
                                    ? { ...c, dropoffs: [...c.dropoffs, c.dropoffs.length] }
                                    : c
                            );
                            setContracts(updated);
                        }}
                    >
                        ➕ Add Dropoff
                    </button>
                </div>
            ))}

            {/* Add Contract Button */}
            <button
                type="button"
                onClick={addContract}
                style={{ marginBottom: 20 }}
            >
                ➕ Add Contract
            </button>
            {/* Remove Contract */}
            <button
                        type="button"
                        style={{ marginTop: 10 }}
                        onClick={() => removeContract(contract.id)}
                    >
                        ❌ Remove Contract
                    </button>

            {/* Submit */}
            <button type="submit" style={{ marginTop: 20 }}>
                🚀 Apply
            </button>
        </form>
    );
}
