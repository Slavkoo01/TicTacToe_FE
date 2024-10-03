import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';
import Input from './common/Input';
import socket from '../utils/socket'; 

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState<string>('');
  

 
  const hasToken = localStorage.getItem('JWT') !== null;


  const handleGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameId(event.target.value);
  };

 
  const handleCreateGame = () => {
    const jwt = localStorage.getItem('JWT');  
    if (jwt) {
      socket.emit('createGame', { token: jwt, gameType: 'MULTIPLAYER' });

      
      socket.on('gameCreated', ({ gameId }) => {
        
        navigate('/game', { state: { mode: 'multiplayer', action: 'create', gameId } });
      });
    } else {
      console.error('No JWT token found');
    }
  };

  
  const handleJoinGame = () => {
    navigate('/game', { state: { mode: 'multiplayer', action: 'join', gameId } });
  };

 
  useEffect(() => {
    return () => {
      socket.off('gameCreated');
    };
  }, []);

  return (
    <div className='container'>
      <div className="main-menu d-grid gap-2 col-6 mx-auto mt-4">
        <button
          className="btn mainMenuBtn btn-primary btn-lg"
          onClick={() => navigate('/game', { state: { mode: 'singleplayer' } })}
        >
          SinglePlayer
        </button>

        {hasToken && (
          <button
            className="btn mainMenuBtn btn-warning btn-lg"
            onClick={handleCreateGame}  
          >
            Create Lobby
          </button>
        )}
        {hasToken && (
          <Input
            key='joinGame'
            name='joinGame'
            label=''
            placeholder='Enter Lobby:'
            value={gameId}
            type="text"
            onChange={handleGameIdChange}
            error={''}
          />
        )}

        {hasToken && (
          <button
            className="btn mainMenuBtn btn-warning btn-lg"
            onClick={handleJoinGame} 
            disabled={!gameId}
          >
            Join Lobby
          </button>
        )}
      </div>

      {!hasToken && <p className="info">Login for multiplayer!</p>}
    </div>
  );
};

export default MainMenu;
