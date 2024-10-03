import React, { useState, useEffect } from "react";
import Board from "./Board";
import { useLocation, useNavigate } from "react-router-dom"; 
import './Style/Game.css';
import socket from '../../utils/socket';

const Game: React.FC = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  useEffect(() => {
    socket.emit('joinRoom', { gameId: state.gameId });
}, [state]);

  useEffect(() => {
    socket.on('moveMade', ({ squares, xIsNext }) => {
      setSquares([...squares]);
      setXIsNext(xIsNext);
    });
  
    socket.on('gameOver', ({ winner, squares }) => {
      setSquares([...squares]);  
      setWinner(winner);
    });
  
    socket.on('startGame', ({ squares, xIsNext }) => {
      setSquares([...squares]); 
      setXIsNext(xIsNext);
    });
  
    socket.on('error', ({ message }) => {
      alert(message);
    });
  
    return () => {
      socket.off('moveMade');
      socket.off('gameOver');
      socket.off('startGame');
      socket.off('error');
    };
  }, []);
  

  const handleSquareClick = (i: number) => {
    if (squares[i] || winner) return;
  
    const newSquares = [...squares]; 
  
    if (state?.mode === 'multiplayer') {
      socket.emit('makeMove', { roomId: state.gameId, squareIndex: i });
    } else if (state?.mode === 'singleplayer') {
      newSquares[i] = 'X';  
      socket.emit('playWithBot', { squares: newSquares });
    }
  };
  
  const handleLeave = () => {   
      state.gameId = '';
      navigate('/');     
  }
  return (
    <div className="container">
      <label className="label">Lobby: {state.gameId}</label>
      <Board
        squares={squares}
        onSquareClick={handleSquareClick}
        xIsNext={xIsNext}
        winner={winner}
      />
      <button className="btn btn-danger btn-lg" onClick={handleLeave}>Leave</button>
    </div>
  );
};

export default Game;
