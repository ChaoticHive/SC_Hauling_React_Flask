import React from "react";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";

interface Props {
  index: number;
  onRemove?: () => void;
}

export default function PickupRow({ index, onRemove }: Props) {
  return (
    <div
      style={{
        marginBottom: 20,
        border: "1px solid #ddd",
        padding: 10,
        borderRadius: 8,
      }}
    >
      <h3>Pick Up #{index + 1}</h3>
      <AutocompleteInput
        placeholder="Pick Up Location"
        apiUrl="http://127.0.0.1:5000/api/waypoints"
        tag="pickup_location"
      />
      <AutocompleteInput
        placeholder="Pick Up Item"
        apiUrl="http://127.0.0.1:5000/api/items"   // NEW: fetch items dynamically
        tag="pickup_item"
      />
      <input className="scu-field"
        type="number"
        placeholder="SCU Total"
        style={{
          padding: 10,
          marginTop: 5,
          width: "100%",
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />
      {onRemove && (
        <button onClick={onRemove} style={{ marginTop: 5 }}>
          Remove
        </button>
      )}
    </div>
  );
}
