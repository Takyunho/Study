import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";

export default function ProductDetail() {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <div style={darkMode ? { backgroundColor: "black", color: "white" } : {}}>
        Product Detail
        <p>
          DarkMode: <span>{darkMode.toString()}</span>
        </p>
        <button onClick={toggleDarkMode}>Toggle</button>
      </div>
    </>
  );
}
