import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Moon, Sun, Menu, X, Home, MessageCircle, ClipboardList, Calendar, Book, Users } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null; // Don't show generic navbar on landing/auth if not logged in

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'AI Chat', path: '/chat', icon: <MessageCircle size={20} /> },
    { name: 'Screening', path: '/screening', icon: <ClipboardList size={20} /> },
    { name: 'Appointments', path: '/appointments', icon: <Calendar size={20} /> },
    { name: 'Journal', path: '/journal', icon: <Book size={20} /> },
    { name: 'Community', path: '/forum', icon: <Users size={20} /> },
  ];

  return (
    <nav style={{ background: 'var(--surface)', padding: '1rem', boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        
        <Link to="/dashboard" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Serenity Space
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }} className="hidden md:flex">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-primary)' }}>
              {link.icon} <span className="hidden lg:inline">{link.name}</span>
            </Link>
          ))}
          
          <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-primary)' }}>
            {theme === 'light' ? <Moon size={20}/> : <Sun size={20}/>}
          </button>
          
          <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Logout</button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
