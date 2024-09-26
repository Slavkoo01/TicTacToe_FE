import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import './NavBar.css';

interface NavbarProps {
  isLoggedIn: boolean; 
  username?: string;   
  onLogout: () => void; 
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, username, onLogout }) => {

    const navigate = useNavigate();
  
    const handleHomeClick = () => {
      navigate('/');
    };

  

  return (
    <nav id="navbar" className="navbar">
      <div className="container-fluid">
       
        <button className="btn" onClick={handleHomeClick}>
          Home
        </button>

        
        <div className="mx-auto text-center">
          <h3>TIC TAC TOE</h3>
        </div>

        
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <>
              <span className="me-3">{username}</span>
              <button className="btn btn-danger" onClick={onLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => console.log('Navigating to Login...')}>
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
