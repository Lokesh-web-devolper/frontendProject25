import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./Admissions.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const Admissions = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const navigate = useNavigate();

  const trendData = [
    { month: "Oct", total: 120, accepted: 90 },
    { month: "Nov", total: 260, accepted: 190 },
    { month: "Dec", total: 420, accepted: 290 },
    { month: "Jan", total: 620, accepted: 450 },
    { month: "Feb", total: 810, accepted: 580 },
    { month: "Mar", total: 610, accepted: 280 },
  ];

  const programData = [
    { name: "Computer Science", rate: 70 },
    { name: "Engineering", rate: 68 },
    { name: "Business", rate: 77 },
    { name: "Arts & Sciences", rate: 82 },
    { name: "Mathematics", rate: 74 },
  ];

  const applicants = [
    {
      initials: "ET",
      name: "Emma Thompson",
      id: "APP-2024-001",
      status: "Under Review",
      email: "emma.thompson@email.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      program: "Computer Science",
      gpa: 3.85,
      testScore: 1420,
      submitted: "2024-03-15",
    },
    {
      initials: "JR",
      name: "James Rodriguez",
      id: "APP-2024-002",
      status: "Accepted",
      email: "james.rodriguez@email.com",
      phone: "+1 (555) 234-5678",
      location: "Los Angeles, CA",
      program: "Engineering",
      gpa: 3.92,
      testScore: 1380,
      submitted: "2024-03-12",
    },
  ];

  // Button handlers
  const handleReview = (applicant) => {
    alert(`Reviewing application for: ${applicant.name} (ID: ${applicant.id})`);
  };

  const handleContact = (applicant) => {
    alert(`Contacting ${applicant.name} at ${applicant.email}`);
  };

  const handleNewApplication = () => {
    alert("Navigate to new application form (functionality placeholder).");
  };

  // REAL logout logic: route to '/login' (or wherever you want)
  const handleLogout = () => {
    // Optionally clear authentication here (e.g. localStorage, cookies)
    navigate("/login"); // change "/login" to your actual login page
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="admissions-container">
      <div className="header-section">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <AiOutlineArrowLeft size={18} /> Back
        </button>
        <h2>Admissions Management</h2>
        <div className="actions">
          <button className="new-app-btn" onClick={handleNewApplication}>
            New Application
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Applications</p>
          <h3>2,847</h3>
          <span className="positive">+18.2%</span>
        </div>
        <div className="stat-card">
          <p>Pending Review</p>
          <h3>426</h3>
          <span className="negative">-12.5%</span>
        </div>
        <div className="stat-card">
          <p>Accepted</p>
          <h3>1,892</h3>
          <span className="positive">+22.1%</span>
        </div>
        <div className="stat-card">
          <p>Enrollment Rate</p>
          <h3>78.4%</h3>
          <span className="positive">+3.2%</span>
        </div>
      </div>

      <div className="tabs">
        <button
          className={activeTab === "applications" ? "active" : ""}
          onClick={() => handleTabChange("applications")}
        >
          Applications
        </button>
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => handleTabChange("analytics")}
        >
          Analytics
        </button>
        <button
          className={activeTab === "programs" ? "active" : ""}
          onClick={() => handleTabChange("programs")}
        >
          Programs
        </button>
        <button
          className={activeTab === "communications" ? "active" : ""}
          onClick={() => handleTabChange("communications")}
        >
          Communications
        </button>
      </div>

      {activeTab === "applications" ? (
        <div className="applications-list">
          {applicants.map((app, index) => (
            <div key={index} className="applicant-card">
              <div className="left">
                <div className="circle">{app.initials}</div>
                <div>
                  <h4>{app.name}</h4>
                  <p>{app.email}</p>
                  <p>
                    <strong>Program:</strong> {app.program} | <strong>GPA:</strong>{" "}
                    {app.gpa} | <strong>Score:</strong> {app.testScore}
                  </p>
                </div>
              </div>
              <div className="right">
                <button className="review-btn" onClick={() => handleReview(app)}>
                  Review
                </button>
                <button className="contact-btn" onClick={() => handleContact(app)}>
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === "analytics" ? (
        <div className="analytics-section">
          <div className="chart-card">
            <h4>Application Trends</h4>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="total" stroke="#3366FF" strokeWidth={2} dot />
                <Line type="monotone" dataKey="accepted" stroke="#00B386" strokeWidth={2} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card">
            <h4>Acceptance Rate by Program</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={programData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-25} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="placeholder-section">
          <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} content coming soon.</h3>
        </div>
      )}
    </div>
  );
};

export default Admissions;
