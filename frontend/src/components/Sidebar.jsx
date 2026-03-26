import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Home, MessageCircle, Users, BookOpen, ClipboardList, Calendar, Heart, Moon, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const toggleTheme = () => {
    const current = document.body.getAttribute('data-theme');
    document.body.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <Heart size={28} fill="var(--primary)" color="var(--primary)" /> MindEase
      </div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '1rem' }}>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Home size={20}/> Dashboard</NavLink>
        <NavLink to="/chat" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><MessageCircle size={20}/> AI Support Chat</NavLink>
        <NavLink to="/forum" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Users size={20}/> Peer Forum</NavLink>
        <NavLink to="/resource-hub" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><BookOpen size={20}/> Resource Hub</NavLink>
        <NavLink to="/screening" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><ClipboardList size={20}/> Mental Screening</NavLink>
        <NavLink to="/appointments" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Calendar size={20}/> Counselling</NavLink>
        <NavLink to="/journal" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}><Heart size={20}/> Journal</NavLink>
      </div>

      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="btn-text" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', padding: '0', border: 'none', cursor: 'pointer' }} onClick={toggleTheme}>
          <Moon size={20}/> Dark Mode
        </button>
        <button className="btn-text" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', padding: '0', border: 'none', cursor: 'pointer' }}>
          <Settings size={20}/> Settings
        </button>
        <button onClick={handleLogout} className="btn-text" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'flex-start', padding: '0', border: 'none', cursor: 'pointer', color: 'var(--danger)' }}>
          <LogOut size={20}/> Sign Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
