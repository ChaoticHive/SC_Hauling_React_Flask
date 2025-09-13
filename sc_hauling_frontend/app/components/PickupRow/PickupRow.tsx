import React from "react";
import AutocompleteInput from "../AutocompleteInput/AutocompleteInput";

interface Props {
  index: number;
  data: { location: string; item: string; scu: number };
  onChange: (data: { location: string; item: string; scu: number }) => void;
  onRemove?: () => void;
}

export default function PickupRow({ index, data, onChange, onRemove }: Props) {
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

      {/* Location */}
      <AutocompleteInput
        placeholder="Pick Up Location"
        apiUrl="http://127.0.0.1:5000/api/waypoints"
        tag="pickup_location"
        value={data.location}
        onChange={(val) => onChange({ ...data, location: val })}
      />

      {/* Item */}
      <AutocompleteInput
        placeholder="Pick Up Item"
        apiUrl="http://127.0.0.1:5000/api/items"
        tag="pickup_item"
        value={data.item}
        onChange={(val) => onChange({ ...data, item: val })}
      />

      {/* SCU */}
      <input
        className="scu-field"
        type="number"
        placeholder="SCU Total"
        value={data.scu}
        onChange={(e) =>
          onChange({ ...data, scu: Number(e.target.value) || 0 })
        }
        style={{
          padding: 10,
          marginTop: 5,
          width: "100%",
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />

      {/* Remove button */}
      {onRemove && (
        <button onClick={onRemove} style={{ marginTop: 5 }}>
          Remove
        </button>
      )}
    </div>
  );
}
