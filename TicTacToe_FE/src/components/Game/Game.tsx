import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "./helpers";
import "./Game.css";

const Game: React.FC = () => {
  const [history, setHistory] = useState<(string | null)[][]>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const winner = calculateWinner(currentSquares);

  const handleSquareClick = (i: number) => {
    if (currentSquares[i] || winner) return;

    const nextSquares = currentSquares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  /*
  const jumpTo = (move: number) => {
     setCurrentMove(move);
   };
  */

  /*const moves = history.map((squares, move) => {
    const description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });*/

  return (
    <div>
      <div>
        <Board
          squares={currentSquares}
          onSquareClick={handleSquareClick}
          xIsNext={xIsNext}
          winner={winner}
        />
      </div>
    </div>
  );
};

export default Game;
