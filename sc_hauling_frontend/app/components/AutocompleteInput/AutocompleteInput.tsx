import React, { useEffect, useState } from "react";

interface Props {
  apiUrl: string;               // API endpoint to fetch options
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  tag?: string;
}

export default function AutocompleteInput({
  apiUrl,
  value = "",
  onChange,
  placeholder = "Select...",
  tag = "",
}: Props) {
  const [inputValue, setInputValue] = useState(value);
  const [filtered, setFiltered] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch options from API
  useEffect(() => {
    if (apiUrl) {
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data: string[]) => setOptions(data))
        .catch(console.error);
    }
  }, [apiUrl]);

  const handleChange = (text: string) => {
    setInputValue(text);
    if (!text) {
      setFiltered(options);
    } else {
      setFiltered(options.filter((opt) => opt.toLowerCase().includes(text.toLowerCase())));
    }
    setShowDropdown(true);
    onChange?.(text, tag);
  };

  const handleSelect = (val: string) => {
    setInputValue(val);
    setShowDropdown(false);
    onChange?.(val, tag);
  };

  const handleFocus = () => {
    if (!inputValue) setFiltered(options);
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 100); // allow click
  };

  return (
    <div style={{ width: "100%", position: "relative", marginBottom: 10 }}>
      <input
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        style={{ padding: 10, border: "1px solid #ccc", borderRadius: 8, width: "100%" }}
        data-tag={tag}
        className="input-field"
      />

      {showDropdown && filtered.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: 42,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            borderRadius: 8,
            zIndex: 1000,
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          {filtered.map((opt, i) => (
            <div
              key={i}
              onClick={() => handleSelect(opt)}
              style={{
                padding: 10,
                cursor: "pointer",
                borderBottom: i !== filtered.length - 1 ? "1px solid #eee" : undefined,
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
