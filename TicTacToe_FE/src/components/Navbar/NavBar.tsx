import * as React from 'react';
import { useNavigate } from "react-router-dom";
import './NavBar.css';
import  TicTacToeIcon  from '../Assets/tic-tac-toe';

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
  
  const handleLoginClick = () => {
    navigate('/login'); 
  };
  const handleUsernameClick = () => {
    navigate('/history');
  };
  const handleLogOutClick = () => {
    onLogout();
    navigate('/', { replace: true });
  };
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="container-fluid1 d-flex align-items-center " onClick={handleHomeClick}> 
            <TicTacToeIcon />
            <h3 className="ms-2">Tic-Tac-Toe</h3> 
          </div>
          <div className="username-logout">
            {isLoggedIn ? (
              <>
                <span className="me-3 usernameSpan" onClick={handleUsernameClick}>{username}</span>
                <button className="btn btn-danger" onClick={handleLogOutClick}>
                  Logout
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
  
};

export default Navbar;
