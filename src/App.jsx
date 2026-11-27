import React, { useState, useEffect, useCallback } from "react";
import GameBoard from "./GameBoard";
import Keyboard from "./keyboard";
import {
  getRandomWord,
  getKeyboardStatuses,
  MAX_GUESSES,
  WORD_LENGTH,
} from "./utils/wordlelogic";
import "./index.css";

export default function App() {
  const [solutionWord, setSolutionWord] = useState(() => getRandomWord());
  const [currentGuess, setCurrentGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");
  const [message, setMessage] = useState("");

  const handleKeyInput = useCallback(
    (rawKey) => {
      if (gameStatus !== "IN_PROGRESS") return;
      const key = rawKey.toUpperCase();
      setMessage("");

      if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (key === "ENTER") {
        if (currentGuess.length !== WORD_LENGTH) {
          setMessage(`Enter ${WORD_LENGTH} letters first.`);
          return;
        }

        const nextGuesses = [...pastGuesses, currentGuess];
        setPastGuesses(nextGuesses);
        setCurrentGuess("");

        if (currentGuess === solutionWord) {
          setGameStatus("WON");
        } else if (nextGuesses.length >= MAX_GUESSES) {
          setGameStatus("LOST");
        }
        return;
      }

      if (/^[A-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
        setCurrentGuess((prev) => prev + key);
      }
    },
    [currentGuess, gameStatus, pastGuesses, solutionWord]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toUpperCase();
      if (k === "ENTER" || k === "BACKSPACE" || /^[A-Z]$/.test(k)) {
        e.preventDefault();
        handleKeyInput(k);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKeyInput]);

  const resetGame = () => {
    setSolutionWord(getRandomWord());
    setCurrentGuess("");
    setPastGuesses([]);
    setGameStatus("IN_PROGRESS");
    setMessage("");
  };

  const keyStatuses = getKeyboardStatuses(pastGuesses, solutionWord);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>WORDLE</h1>
      </header>

      {message && <div className="message-banner">{message}</div>}

      <main className="game-main">
        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          solutionWord={solutionWord}
        />

        <Keyboard
          onKeyPress={handleKeyInput}
          keyStatuses={keyStatuses}
          disabled={gameStatus !== "IN_PROGRESS"}
        />
      </main>

      {gameStatus !== "IN_PROGRESS" && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{gameStatus === "WON" ? "You Won!" : "Game Over"}</h2>
            <p>
              {gameStatus === "WON"
                ? `Solved in ${pastGuesses.length} / ${MAX_GUESSES} tries.`
                : "No attempts remaining."}
            </p>
            <div className="word-box">
              Word: <strong>{solutionWord}</strong>
            </div>
            <button type="button" className="play-again-btn" onClick={resetGame}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}