// src/pages/Settings.jsx
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../services/authService';

const Settings = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    try {
      changePassword(oldPassword, newPassword);
      setMessage('Password updated successfully!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      setMessage('Error: ' + err.message);
    }
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="settings-card">
        <h2>Theme</h2>
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>

      <div className="settings-card">
        <h2>Change Password</h2>
        <form onSubmit={handlePasswordChange}>
          <div>
            <label>Current Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Update Password</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>

      <div className="settings-card">
        <h2>Admin Info</h2>
        <p><strong>Logged in as:</strong> {user?.username}</p>
        <p><strong>Role:</strong> {user?.role || 'Admin'}</p>
      </div>
    </div>
  );
};

export default Settings;