import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MainMenu.css";
import Input from "./common/Input";
import socket from "../utils/socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState<string>("");
  const hasToken = localStorage.getItem("JWT") !== null;

  useEffect(() => {
    socket.on("error", ({ message }) => {
      alert(message);
    });

    return () => {
      socket.off("error");
    };
  }, []);

  const handleCreateGame = () => {
    const jwt = localStorage.getItem("JWT");
  
    if (jwt) {
        socket.emit("createGame", { token: jwt, gameType: "MULTIPLAYER" });
  
        socket.once("gameCreated", ({ ReturnedGameId }) => {
          setGameId(ReturnedGameId);
          localStorage.setItem("currentGameId", ReturnedGameId); // Store game ID locally
          navigate("/game", {
            state: { mode: "multiplayer", gameId: ReturnedGameId },
          });
        });
   
      socket.once('alreadyInLobby', () => {
        toast('You are already in a game lobby!');
      });
  
    } else {
      console.error("No JWT token found");
    }
  }
  
  

  const handleJoinGame = useCallback(() => {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {

          socket.emit('bussyLobby', { gameId, token:jwt });
          socket.once('notBussy',() => {
            navigate("/game", {
              state: { mode: "multiplayer", gameId },
            });
          });
      toast('You cannot join this game!');
    } else {
      console.error("No JWT token found");
    }
  }, [gameId, navigate]);

  const handleGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGameId(value);
  };

  return (
    <div className="container">
      <div className="main-menu d-grid gap-2 col-6 mx-auto mt-4">
        <button
          className="btn mainMenuBtn btn-primary btn-lg"
          onClick={() => navigate("/game", { state: { mode: "singleplayer" } })}
        >
          SinglePlayer
        </button>

        {hasToken && (
          <>
            <button
              className="btn mainMenuBtn btn-warning btn-lg"
              onClick={handleCreateGame}
            >
              Create Lobby
            </button>

            <Input
              key="joinGame"
              name="joinGame"
              label=""
              placeholder="Enter Lobby:"
              value={gameId}
              type="text"
              onChange={handleGameIdChange}
              error={""}
            />

            <button
              className="btn mainMenuBtn btn-warning btn-lg"
              onClick={handleJoinGame}
              disabled={!gameId}
            >
              Join Lobby
            </button>
          </>
        )}
        <ToastContainer className={"Toastify__Container"} />
      </div>
    </div>
  );
};

export default MainMenu;
