import React from 'react';
import './Game.css';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick }) => {
  return (
    <button className="cell" onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
