// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/students/add">Add Student</Link>
      <button onClick={isAuthenticated ? logout : login} style={{ background: 'transparent', color: 'white', border: '1px solid white' }}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

export default Navbar;