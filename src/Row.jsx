import React from "react";
import Tile from "./tile";
import { evaluateGuess, WORD_LENGTH } from "./utils/wordlelogic";

export default function Row({ guess = "", solutionWord = "", isSubmitted = false }) {
  const padded = guess.padEnd(WORD_LENGTH, " ").split("");
  const statuses = isSubmitted ? evaluateGuess(guess, solutionWord) : [];

  return (
    <div className="board-row">
      {padded.map((ch, idx) => {
        const letter = ch === " " ? "" : ch;
        let status = "empty";
        if (isSubmitted) {
          status = statuses[idx];
        } else if (letter !== "") {
          status = "active";
        }
        return <Tile key={idx} letter={letter} status={status} />;
      })}
    </div>
  );
}