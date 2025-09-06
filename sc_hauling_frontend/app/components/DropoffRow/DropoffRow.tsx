import React from "react";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";

interface Props {
  index: number;
  onRemove?: () => void;
}

export default function DropoffRow({ index, onRemove }: Props) {
  return (
    <div
      style={{
        marginBottom: 20,
        border: "1px solid #ddd",
        padding: 10,
        borderRadius: 8,
      }}
    >
      <h3>Drop Off #{index + 1}</h3>
      <AutocompleteInput
        placeholder="Drop Off Location"
        apiUrl="http://127.0.0.1:5000/api/waypoints"
        tag="dropoff_location"
      />
      <AutocompleteInput
        placeholder="Drop Off Item"
        apiUrl="http://127.0.0.1:5000/api/items"  // NEW: fetch items dynamically
        tag="dropoff_item"
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
