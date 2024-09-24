import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import GameBoard from './components/GameBoard';
import Login from './components/Login';

const App: React.FC = () => {

    const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));

    const handleCellClick = (index: number) => {
     
      const newBoard = [...board];
      newBoard[index] = 'X'; 
      setBoard(newBoard);
    };
    return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/singleplayer" element={<GameBoard board={board} onCellClick={handleCellClick} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
