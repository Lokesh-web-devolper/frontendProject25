import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import axios from 'axios';
import './Analytics.css';

export default function Analytics() {
  const navigate = useNavigate();

  // Use state variables for all dashboard data
  const [metrics, setMetrics] = useState([]);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [insights, setInsights] = useState([]);

  // Icon mappings for metrics cards
  const metricIcons = {
    "Total Students": <Users />,
    "Active Courses": <BookOpen />,
    "Average GPA": <TrendingUp />,
    "Revenue": <DollarSign />,
  };
  const metricColors = {
    "Total Students": "#3B82F6",
    "Active Courses": "#10B981",
    "Average GPA": "#8B5CF6",
    "Revenue": "#F59E0B",
  };

  // Fetch from API on mount
  useEffect(() => {
    axios.get('http://localhost:5000/analytics').then(res => {
      const data = res.data;
      setMetrics(data.metrics.map((m, i) => ({
        ...m,
        icon: metricIcons[m.title] || <TrendingUp />,
        color: metricColors[m.title] || "#999"
      })));
      setEnrollmentData(data.enrollmentData || []);
      setPerformanceData(data.performanceData || []);
      setDepartmentData(data.departmentData?.map(d =>
        ({ ...d, color: d.color || '#3B82F6' })
      ) || []);
      setInsights(data.insights || []);
    });
  }, []);

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1>Analytics</h1>
        <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
      </div>

      <div className="metrics-grid">
        {metrics.map((m, i) => (
          <div key={i} className="metric-card">
            <div className="metric-icon" style={{ backgroundColor: m.color + '20', color: m.color }}>
              {m.icon}
            </div>
            <div>
              <h4>{m.title}</h4>
              <p className="metric-value">{m.value}</p>
              <span className="metric-change">{m.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Student Enrollment Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Students by Department</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%" cy="50%" outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`} labelLine={false}
              >
                {departmentData.map((entry, index) =>
                  <Cell key={`cell-${index}`} fill={entry.color} />
                )}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card full-width">
          <h3>Average Performance by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="average" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="insights-card">
        <h3>Recent Insights</h3>
        <ul>
          {insights.map((item, idx) => (
            <li key={idx} className={
              item.includes('English') || item.includes('highest') ? 'green' :
              item.includes('enrollment') ? 'blue' :
              item.includes('Computer Science') ? 'orange' : ''}
            >{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
