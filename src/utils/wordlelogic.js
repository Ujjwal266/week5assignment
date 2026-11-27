export const WORD_LIST = [
  "CLOUD", "SPARK", "ORBIT", "PRISM", "SOLAR",
  "EMBER", "FJORD", "GLINT", "HAVEN", "INDEX",
  "KARMA", "LUNAR", "MIRTH", "NEXUS", "OASIS",
  "PULSE", "QUART", "ROAST", "STORM", "THORN",
  "ULTRA", "VAPOR", "WALTZ", "XYLEN", "YIELD",
  "ZONAL"
];

export const MAX_GUESSES = 6;
export const WORD_LENGTH = 5;

export function getRandomWord() {
  const index = Math.floor(Math.random() * WORD_LIST.length);
  return WORD_LIST[index];
}

export function evaluateGuess(guess, solution) {
  const result = Array(WORD_LENGTH).fill("absent");
  const solutionChars = solution.split("");
  const guessChars = guess.split("");
  const used = Array(WORD_LENGTH).fill(false);

  // First pass: exact matches (Emerald Green)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessChars[i] === solutionChars[i]) {
      result[i] = "correct";
      used[i] = true;
    }
  }

  // Second pass: wrong position matches (Amber Gold)
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;
    const matchIdx = solutionChars.findIndex(
      (ch, idx) => ch === guessChars[i] && !used[idx]
    );
    if (matchIdx !== -1) {
      result[i] = "present";
      used[matchIdx] = true;
    }
  }

  return result;
}

export function getKeyboardStatuses(pastGuesses, solution) {
  const statuses = {};
  const rank = { correct: 3, present: 2, absent: 1 };

  for (const guess of pastGuesses) {
    const evalRow = evaluateGuess(guess, solution);
    guess.split("").forEach((letter, idx) => {
      const nextStatus = evalRow[idx];
      const prevStatus = statuses[letter];
      if (!prevStatus || rank[nextStatus] > rank[prevStatus]) {
        statuses[letter] = nextStatus;
      }
    });
  }

  return statuses;
}