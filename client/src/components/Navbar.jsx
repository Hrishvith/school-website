import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo">
          <Link to={auth.token ? '/home' : '/'}>School</Link>
        </div>
        <ul className="nav-links">
          {auth.token ? (
            <>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/notes">Notes</Link></li>
              <li className="welcome">Welcome, {auth.username}</li>
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/">Sign in</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
