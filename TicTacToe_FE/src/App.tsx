import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Login from './components/Login/Login';
import Game from './components/Game/Game';
import Registration from "./components/Registration/Registration";

const App: React.FC = () => {
    return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainMenu />} />
          <Route path="/singleplayer" element={<Game />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
