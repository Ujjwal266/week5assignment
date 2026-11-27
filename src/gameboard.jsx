import React from "react";
import Row from "./Row";
import { MAX_GUESSES } from "./utils/wordlelogic";

export default function GameBoard({ pastGuesses, currentGuess, solutionWord }) {
  const rows = Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
    if (rowIndex < pastGuesses.length) {
      return { guess: pastGuesses[rowIndex], isSubmitted: true };
    }
    if (rowIndex === pastGuesses.length) {
      return { guess: currentGuess, isSubmitted: false };
    }
    return { guess: "", isSubmitted: false };
  });

  return (
    <div className="game-board">
      {rows.map((row, idx) => (
        <Row
          key={idx}
          guess={row.guess}
          solutionWord={solutionWord}
          isSubmitted={row.isSubmitted}
        />
      ))}
    </div>
  );
}