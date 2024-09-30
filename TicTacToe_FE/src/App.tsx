import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Login from './components/Login/Login';
import Game from './components/Game/Game';
import Navbar from './components/Navbar/NavBar';
import History from './components/GameHistoryTable/GameHistoryTable';
import Registration from "./components/Registration/Registration";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined); 
  
  useEffect(() => {
    const token = localStorage.getItem('JWT');
    if(token) {
      const decode = JSON.parse(atob(token.split('.')[1]));
      setIsLoggedIn(true);
      setUsername(decode.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('JWT');
    setIsLoggedIn(false);
    setUsername(undefined);
  }
  const gameHistory = [
    { id: 1, player1: 'Alice', player2: 'Bob', result: 'Alice wins', date: '2024-09-30' },
    { id: 2, player1: 'Charlie', player2: 'David', result: 'Bob wins', date: '2024-09-29' },
    { id: 3, player1: 'Eve', player2: 'Frank', result: 'Draw', date: '2024-09-28' },
    // Add more game history entries as needed
  ];

  return (
      <div className="app">
    <Router>
    <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/singleplayer" element={<Game />} />
          <Route path="/history" element={<History history={gameHistory} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
    </Router>
      </div>
  );
};

export default App;
