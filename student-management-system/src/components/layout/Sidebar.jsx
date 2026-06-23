import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>📚 SMS</h2>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/students/add">Add Student</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <button onClick={logout} className="logout-btn">Logout</button>
      </nav>
    </aside>
  );
};

export default Sidebar;