import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainMenu.css';

const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-menu d-grid gap-2 col-6 mx-auto mt-4">
      <button 
        className="btn mainMenuBtn btn-primary btn-lg" 
        onClick={() => navigate('/game', { state: { mode: 'singleplayer' } })}
      >
        SinglePlayer
      </button>
      
      <button 
        className="btn mainMenuBtn btn-warning btn-lg" 
        onClick={() => navigate('/game', { state: { mode: 'multiplayer' } })}
      >
        MultiPlayer
      </button>
    </div>
  );
};

export default MainMenu;
