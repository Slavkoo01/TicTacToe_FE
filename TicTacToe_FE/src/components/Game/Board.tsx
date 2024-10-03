import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (i: number) => void;
  xIsNext: boolean;
  winner: string | null;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, xIsNext, winner }) => {
  const status = winner === 'draw' ? 'Draw' : winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className='container'> 
      <div className="status">{status}</div>
      <div className="game-board">
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} />
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} />
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} />
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
    </div>
  );
};

export default Board;
