import React, { useState, useEffect } from "react";
import Board from "./Board";
import io from "socket.io-client";
import { useLocation } from "react-router-dom"; 


const socket = io('http://localhost:4000');

const Game: React.FC = () => {
  const { state } = useLocation(); 
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  useEffect(() => {
    if (state?.mode === 'multiplayer') {
      socket.emit('joinRoom', 'room1');
    }
  }, [state?.mode]);

  useEffect(() => {
    socket.on('moveMade', ({ squares, xIsNext }) => {
      setSquares(squares);
      setXIsNext(xIsNext);
    });
    socket.on('gameOver', ({ winner, squares }) => {
      setSquares(squares);
      setWinner(winner);
    });
    socket.on('startGame', ({ squares, xIsNext }) => {
      setSquares(squares);
      setXIsNext(xIsNext);
    });
  }, [socket]);


  const handleSquareClick = (i: number) => {
    if (squares[i] || winner) return;
    
    if (state?.mode === 'multiplayer') {
      socket.emit('makeMove', { roomId: 'room1', squareIndex: i });
    } else if (state?.mode === 'singleplayer') {
      squares[i] = 'X';
      socket.emit('playWithBot', { squares });
    }
  };
  
  return (
    <div>
     
      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        xIsNext={xIsNext}
        winner={winner}></Board>
    </div>
  );
};

export default Game;
