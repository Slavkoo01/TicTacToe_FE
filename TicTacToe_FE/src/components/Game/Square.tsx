import React from 'react';
import './Style/Game.css';

interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  isSquareDisabled?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onSquareClick, isSquareDisabled = false }) => {
  return (
    <button  className={`cell ${isSquareDisabled === true ? 'disabled' : ''}`} onClick={onSquareClick} >
      {value}
    </button>
  );
};

export default Square;
