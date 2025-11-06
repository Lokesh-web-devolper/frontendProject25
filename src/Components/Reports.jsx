import React, { useState } from 'react';
import { ArrowLeft, Download, FileText, BarChart3, Users, TrendingUp, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import './Reports.css';
import { useNavigate } from 'react-router-dom';

export default function Reports({ onNavigate, onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('academic');
  const [selectedPeriod, setSelectedPeriod] = useState('semester');

  const quickStats = [
    { title: 'Reports Generated', value: '42', change: '+8 this month', icon: <FileText className="stat-icon"/>, color: 'stat-blue' },
    { title: 'Data Points', value: '12.5K', change: '+2.1K this week', icon: <BarChart3 className="stat-icon"/>, color: 'stat-green' },
    { title: 'Active Users', value: '89', change: '+12 today', icon: <Users className="stat-icon"/>, color: 'stat-purple' },
    { title: 'Automation Rate', value: '94%', change: '+3% improvement', icon: <TrendingUp className="stat-icon"/>, color: 'stat-orange' }
  ];

  const academicReports = [
    { name: 'Student Performance Report', description: 'Detailed academic performance analysis', type: 'Academic', lastGenerated: '2024-03-15', status: 'Ready', size: '2.4 MB' },
    { name: 'Grade Distribution Report', description: 'Course-wise grade distribution analysis', type: 'Academic', lastGenerated: '2024-03-10', status: 'Ready', size: '1.8 MB' },
    { name: 'Attendance Summary', description: 'Student attendance patterns and statistics', type: 'Academic', lastGenerated: '2024-03-12', status: 'Ready', size: '1.2 MB' }
  ];

  const financialReports = [
    { name: 'Tuition Collection Report', description: 'Fee collection status and outstanding amounts', type: 'Financial', lastGenerated: '2024-03-14', status: 'Ready', size: '3.1 MB' },
    { name: 'Scholarship Distribution', description: 'Scholarship awards and budget allocation', type: 'Financial', lastGenerated: '2024-03-08', status: 'Processing', size: '2.2 MB' },
    { name: 'Budget Utilization Report', description: 'Department-wise budget usage analysis', type: 'Financial', lastGenerated: '2024-03-05', status: 'Ready', size: '1.9 MB' }
  ];

  const enrollmentData = [
    { month: 'Sep', enrolled: 1200, target: 1250 },
    { month: 'Oct', enrolled: 1180, target: 1250 },
    { month: 'Nov', enrolled: 1220, target: 1250 },
    { month: 'Dec', enrolled: 1240, target: 1250 },
    { month: 'Jan', enrolled: 1260, target: 1300 },
    { month: 'Feb', enrolled: 1280, target: 1300 },
    { month: 'Mar', enrolled: 1295, target: 1300 }
  ];

  const performanceData = [
    { department: 'Computer Science', avgGPA: 3.45, students: 280 },
    { department: 'Engineering', avgGPA: 3.32, students: 245 },
    { department: 'Business', avgGPA: 3.28, students: 220 },
    { department: 'Arts & Sciences', avgGPA: 3.51, students: 190 },
    { department: 'Mathematics', avgGPA: 3.38, students: 165 }
  ];
  const logout = () => navigate("/");
  return (
    <div className="reports-container">
      <div className="reports-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} /> Reports & Analytics
        </button>
        <div className="header-right">
          <select value={selectedPeriod} onChange={e => setSelectedPeriod(e.target.value)}>
            <option value="semester">This Semester</option>
            <option value="quarter">This Quarter</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="report_logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="stats-grid">
        {quickStats.map((stat, i) => (
          <div className={`stat-card ${stat.color}`} key={i}>
            {stat.icon}
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-change">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="tab-list">
        <button className={activeTab === 'academic' ? 'active' : ''} onClick={() => setActiveTab('academic')}>Academic Reports</button>
        <button className={activeTab === 'financial' ? 'active' : ''} onClick={() => setActiveTab('financial')}>Financial Reports</button>
        <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>Live Analytics</button>
        <button className={activeTab === 'custom' ? 'active' : ''} onClick={() => setActiveTab('custom')}>Custom Reports</button>
      </div>

      {activeTab === 'financial' &&
        <div className="reports-section">
          <div className="section-header">
            <h3>Financial Reports</h3>
            <button className="generate-btn">
              <Download size={17} /> Generate New
            </button>
          </div>
          {financialReports.map((report, i) => (
            <div className="report-card" key={i}>
              <div>
                <h4>
                  {report.name}
                  <span className="small-badge">{report.type}</span>
                  <span className={`badge-status ${report.status === 'Ready' ? 'ready' : report.status === 'Processing' ? 'processing' : ''}`}>
                    {report.status}
                  </span>
                </h4>
                <p>{report.description}</p>
                <small>Generated: {report.lastGenerated} &nbsp; Size: {report.size}</small>
              </div>
              <div>
                <button className="small-btn"><Download /> Download</button>
                <button className="small-btn">View</button>
              </div>
            </div>
          ))}
        </div>
      }

      {activeTab === 'analytics' &&
        <div className="reports-section">
          <div className="section-header">
            <h3>Enrollment Trends</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="enrolled" stroke="#3B82F6" strokeWidth={3} />
              <Line type="monotone" dataKey="target" stroke="#EF4444" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="section-header">
            <h3>Department Performance</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="avgGPA" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      }

      {/* add other sections as needed */}
    </div>
  );
}
