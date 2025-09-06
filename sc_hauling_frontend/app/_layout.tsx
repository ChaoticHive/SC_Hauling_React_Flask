import { Slot } from "expo-router";
import React from "react";

export default function Layout() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <header>
        <h1>📦 SC Hauling</h1>
      </header>
      <Slot /> {/* renders page content */}
    </div>
  );
}
