import React, { useState, useEffect, useCallback } from "react";
import Board from "./Board";
import { useLocation, useNavigate } from "react-router-dom";
import "./Style/Game.css";
import socket from "../../utils/socket";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Game: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [playerSign, setPlayerSign] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<string | null>(null);
  
  const activeGameStatus = "active";
  const finishedGameStatus = "finished";
  const pendingGameStatus = "pending";

  useEffect(() => {
    if (!state) {
        alert('Create Game or Join Game first!');
        navigate('/', { replace: true });
        return; 
      } 



    setGameStatus(state.mode === "singleplayer" ? activeGameStatus : null);
    const jwt = localStorage.getItem("JWT");
    
    const setupSocketListeners = () => {
      if (state.mode !== 'singleplayer') {
        socket.emit("joinRoom", { token: jwt, gameId: state.gameId });
        socket.emit("checkStatus", { token: jwt, gameId: state.gameId });
        
        socket.on("playerAssigned", ({ sign }) => setPlayerSign(sign));
        
        socket.on("changeStatus", ({ status, winner }) => {
          if (status === "active") setGameStatus("active");
          else if (status === "pending") setGameStatus("pending");
          else if (status === "finished") {
            if (winner) setWinner(winner);
            setGameStatus("finished");
          } else if (status === "aborted") {
            toast('Game has been aborted!');
            navigate('/', { replace: true });
          } else {
            console.error(`Unknown game status: ${status}`);
          }
        });
      }

      socket.on("moveMade", ({ squares, xIsNext }) => {
        setSquares([...squares]);
        setXIsNext(xIsNext);
      });

      socket.on("gameOver", ({ winner, squares }) => {
        setSquares([...squares]);
        setWinner(winner);
        setGameStatus(finishedGameStatus);
      });

      socket.on("startGame", ({ squares, xIsNext, sign }) => {
        setSquares([...squares]);
        setXIsNext(xIsNext);
        setPlayerSign(sign);

      });

      socket.on("gameRestored", ({ squares, xIsNext, sign }) => {
        setSquares([...squares]);
        setXIsNext(xIsNext);
        setPlayerSign(sign);

      });

      socket.on('notification', ({ message }) => {
        //toast(message);
      });
    };

    setupSocketListeners();
    const handleBeforeUnload = () => {
      if (state?.gameId) {
        socket.emit("leaveRoom", { gameId: state.gameId });
      }
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.emit("leaveRoom", { gameId: state.gameId });
      socket.off("playerAssigned");
      socket.off("changeStatus");
      socket.off("moveMade");
      socket.off("gameOver");
      socket.off("startGame");
      socket.off("gameRestored");
      socket.off("notification");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state, navigate]);

  //mechanics
  const handleSquareClick = useCallback((i: number) => {

    if (state?.mode === "multiplayer") {
      if (gameStatus === activeGameStatus && !squares[i] && !winner && playerSign === (xIsNext ? "X" : "O")) {

        socket.emit("makeMove", { roomId: state.gameId, squareIndex: i });
      }
    } else if (state?.mode === "singleplayer") {
      if (!squares[i] && !winner) {
        const newSquares = [...squares];
        newSquares[i] = "X";
        socket.emit("playWithBot", { squares: newSquares });
      }
    }
  }, [state, gameStatus, squares, winner, playerSign, xIsNext]);

  const handleLeave = useCallback(() => {
    socket.emit("leaveRoom", { gameId: state?.gameId });
    navigate("/", { replace: true });
  }, [navigate, state]);

  return (
    <div className="container">
      {state?.mode !== "singleplayer" && <label className="label">Lobby: {state?.gameId}<br/>{playerSign && `Your sign: ${playerSign}`}</label>}
      {gameStatus === pendingGameStatus && <p className="game-status">Waiting for opponent...</p>}
      <Board squares={squares} onSquareClick={handleSquareClick} xIsNext={xIsNext} winner={winner} />
      <button className="btn btn-danger btn-lg leave" onClick={handleLeave}>Leave</button>
      <ToastContainer className={'Toastify__Container'}/>
    </div>
  );
};

export default Game;
