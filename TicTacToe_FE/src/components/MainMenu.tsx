import React from 'react';
import { useNavigate } from 'react-router-dom';


const MainMenu: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="main-menu text-center m-5">
      <h1>Tic-Tac-Toe</h1>
      
      <div className="d-grid gap-2 col-6 mx-auto mt-4">
        <button 
          className="btn btn-primary btn-lg" 
          onClick={() => navigate('/singleplayer')}
        >
          SinglePlayer
        </button>
        
        <button 
          className="btn btn-warning btn-lg" 
          onClick={() => alert('Online multiplayer not implemented yet!')}
        >
          MultiPlayer
        </button>
        <button 
          className="btn btn-secondary btn-lg" 
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        
      </div>
    </div>
  );
};

export default MainMenu;
