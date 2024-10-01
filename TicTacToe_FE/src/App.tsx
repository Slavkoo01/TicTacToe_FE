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
 

  return (
      <div className="app">
    <Router>
    <Navbar isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/singleplayer" element={<Game />} />
          <Route path="/history" element={<History/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
    </Router>
      </div>
  );
};

export default App;
