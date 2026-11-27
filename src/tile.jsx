import React from "react";

export default function Tile({ letter = "", status = "empty" }) {
  return (
    <div className={`tile tile-${status}`}>
      {letter}
    </div>
  );
}