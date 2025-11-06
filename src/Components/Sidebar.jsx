import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaEnvelope,
  FaChartLine,
  FaCog,
  FaDatabase,
  FaThLarge,
  FaSignOutAlt,
  FaChevronDown
} from "react-icons/fa";
import './Sidebar.css';
import './StudentProfile.css';

export default function StudentProfile() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <h2>Intelearn</h2>
          </div>
        </div>

        <ul className="sidebar-menu">
          <li className="menu-item active" onClick={() => navigate('/dashboard')}>
            <FaThLarge className="icon" />
            <span>Dashboard</span>
            <FaChevronDown className="dropdown-icon" />
          </li>
          <ul className="submenu">
            <li>Admin</li>
            <li>Students</li>
            <li>Professors</li>
          </ul>
          <li className="menu-item" onClick={() => navigate('/email')}>
            <FaEnvelope className="icon" />
            <span>Email</span>
          </li>
          <li className="menu-item" onClick={() => navigate('/attendance')}>
            <FaChartLine className="icon" />
            <span>Attendance</span>
          </li>
          <li className="menu-item" onClick={() => navigate('/settings')}>
            <FaCog className="icon" />
            <span>Settings</span>
          </li>
          <li className="menu-item" onClick={() => navigate('/database')}>
            <FaDatabase className="icon" />
            <span>Database</span>
          </li>
        </ul>

        <div className="logout" onClick={() => navigate('/')}>
          <FaSignOutAlt className="icon" />
          <span>Log out</span>
        </div>
      </aside>

      {/* StudentProfile Content */}
      <div className="student-profile-container">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
        <h1 className="profile-title">Student Profile</h1>
        <div className="profile-card">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="student" className="profile-img" />
          <div className="profile-info">
            <h2>Rohit Sharma</h2>
            <p>ID: 22010123</p>
            <p>Email: rohitsharma@email.com</p>
            <p>Major: Computer Science</p>
          </div>
        </div>
      </div>
    </div>
  );
}
