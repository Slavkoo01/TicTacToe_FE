

import React from 'react';
import './GameBoard.css'; 

interface GameBoardProps {
  board: (string | null)[];
  onCellClick: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick }) => {
  return (
    <div className="game-board">
      {board.map((cell, index) => (
        <div 
          key={index} 
          className="cell" 
          onClick={() => onCellClick(index)}
        >
          {cell}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
