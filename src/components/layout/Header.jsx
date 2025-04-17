import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    height: 'var(--header-height)',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'var(--background-color)',
  };

  const logoStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
    letterSpacing: '1px',
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
  };

  const linkStyle = {
    textDecoration: 'none',
    borderBottom: 'none',
    padding: '5px 0',
    position: 'relative',
  };

  const activeLinkStyle = {
    ...linkStyle,
    fontWeight: 'bold',
  };

  const activeLinkAfterStyle = {
    content: '""',
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '2px',
    backgroundColor: 'var(--text-color)',
  };

  const buttonStyle = {
    background: 'none',
    border: '1px solid var(--text-color)',
    color: 'var(--text-color)',
    padding: '5px 10px',
    cursor: 'pointer',
    marginLeft: '15px',
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <Link to="/" style={{ borderBottom: 'none' }}>
          DEP•LOY
        </Link>
      </div>

      <div style={navStyle}>
        <Link to="/" style={linkStyle}>
          Deployments
        </Link>
        <Link to="/new" style={linkStyle}>
          New Deployment
        </Link>
        <button 
          onClick={toggleTheme} 
          style={buttonStyle}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;