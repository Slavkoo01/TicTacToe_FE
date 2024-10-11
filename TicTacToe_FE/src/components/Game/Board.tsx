import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: (string | null)[];
  onSquareClick: (i: number) => void;
  xIsNext: boolean;
  winner: string | null;
  isGameHistoryMoves?: boolean;
  areSquaresDisabled?: boolean;
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick, xIsNext, winner, areSquaresDisabled = false, isGameHistoryMoves = false}) => {
  const status = winner === 'draw' ? 'Draw' : winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className='container'> 
      <div className="status">{!isGameHistoryMoves && status}</div>
      <div className="game-board">
        <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[1]} onSquareClick={() => onSquareClick(1)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[2]} onSquareClick={() => onSquareClick(2)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[3]} onSquareClick={() => onSquareClick(3)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[4]} onSquareClick={() => onSquareClick(4)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[5]} onSquareClick={() => onSquareClick(5)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[6]} onSquareClick={() => onSquareClick(6)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[7]} onSquareClick={() => onSquareClick(7)} isSquareDisabled={areSquaresDisabled}/>
        <Square value={squares[8]} onSquareClick={() => onSquareClick(8)} isSquareDisabled={areSquaresDisabled}/>
      </div>
    </div>
  );
};

export default Board;
