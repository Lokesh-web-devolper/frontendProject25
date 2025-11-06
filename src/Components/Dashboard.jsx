import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  FileText,
  Settings,
  GraduationCap,
  CreditCard,
  Bell,
  HelpCircle,
  SunMoon
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage, default to false for light mode
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (!darkMode) {
      document.body.classList.add('dark-mode');
      document.body.style.backgroundColor = '#121212';
    } else {
      document.body.classList.remove('dark-mode');
      document.body.style.backgroundColor = '#f5f7fa';
    }
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  const handleLogout = () => navigate('/');

  const handleCardClick = (title) => {
    if (title === 'Student Management') {
      navigate('/student-profile');
    } 
    else if (title === 'Course Management') {
      navigate('/course-management');
    }
    else if (title === 'Schedule Management') {
    navigate('/schedule-management'); 
    }
    else if (title === 'Analytics') {
    navigate('/analytics'); 
    }
    else if (title === 'Reports') {
    navigate('/reports'); 
    }
    else if (title === 'Finance') {
    navigate('/finance'); 
    }
    else if (title === 'Admissions') {
    navigate('/admissions'); 
    }
    else if (title === 'Settings') {
    navigate('/settings'); 
    }
  };

  const modules = [
    { icon: Users, title: 'Student Management', subtitle: 'Manage student records', color: '#1976d2' },
    { icon: BookOpen, title: 'Course Management', subtitle: 'Course catalog & enrollment', color: '#2e7d32' },
    { icon: Calendar, title: 'Schedule Management', subtitle: 'Class schedules & timetables', color: '#6a1b9a' },
    { icon: BarChart3, title: 'Analytics', subtitle: 'Performance insights', color: '#ef6c00' },
    { icon: FileText, title: 'Reports', subtitle: 'Generate & view reports', color: '#c62828' },
    { icon: CreditCard, title: 'Finance', subtitle: 'Fee management', color: '#283593' },
    { icon: GraduationCap, title: 'Admissions', subtitle: 'Application processing', color: '#00695c' },
    { icon: Settings, title: 'Settings', subtitle: 'System configuration', color: '#455a64' }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="header-right">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle light/dark mode">
            <SunMoon size={20} />
            {!(darkMode) ? 'Light Mode' : 'Dark Mode'}
          </button>
          <Bell className="icon" />
          <HelpCircle className="icon" />
          <button className="dashBoard_logout-btn" onClick={handleLogout}>
            <ArrowLeft size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="card-grid">
        {modules.map((m, i) => (
          <div
            key={i}
            className="card"
            onClick={() => handleCardClick(m.title)}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-icon" style={{ backgroundColor: m.color + '20', color: m.color }}>
              <m.icon size={24} />
            </div>
            <div>
              <h2>{m.title}</h2>
              <p>{m.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
