import React from "react";

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

export default function Keyboard({ onKeyPress, keyStatuses, disabled }) {
  return (
    <div className="keyboard">
      {ROWS.map((row, rIdx) => (
        <div key={rIdx} className="keyboard-row">
          {row.map((key) => {
            const status = keyStatuses[key] || "default";
            const isWide = key === "ENTER" || key === "BACKSPACE";
            return (
              <button
                key={key}
                type="button"
                disabled={disabled}
                onClick={() => onKeyPress(key)}
                className={`key ${isWide ? "key-wide" : ""} key-${status}`}
              >
                {key === "BACKSPACE" ? "⌫" : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}