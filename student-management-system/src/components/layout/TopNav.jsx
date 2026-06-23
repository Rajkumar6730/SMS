import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const TopNav = () => {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="top-nav">
      <div className="top-nav-left">
        <span>👋 Welcome, {user?.username || 'Admin'}</span>
      </div>
      <div className="top-nav-right">
        <button onClick={toggleDarkMode}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
};

export default TopNav;