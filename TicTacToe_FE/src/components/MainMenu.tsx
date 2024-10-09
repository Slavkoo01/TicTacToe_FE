import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./MainMenu.css";
import Input from "./common/Input";
import socket from "../utils/socket";

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

  const handleCreateGame = useCallback(() => {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      socket.emit("createGame", { token: jwt, gameType: "MULTIPLAYER" });
      socket.on("gameCreated", ({ ReturnedGameId }) => {
        setGameId(ReturnedGameId);
        navigate("/game", {
          state: { mode: "multiplayer", gameId: ReturnedGameId },
        });
      });
    } else {
      console.error("No JWT token found");
    }
  }, [navigate]);

  const handleJoinGame = useCallback(() => {
    const jwt = localStorage.getItem("JWT");
    if (jwt) {
      socket.emit("joinRoom", { token: jwt, gameId });
      socket.on("joinedRoom", () => {
        navigate("/game", {
          state: { mode: "multiplayer", gameId },
        });
      });
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

        {!hasToken && <p className="info">Login for multiplayer!</p>}
      </div>
    </div>
  );
};

export default MainMenu;
