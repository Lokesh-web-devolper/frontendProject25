import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./StudentProfile.css";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  BookOpen,
  Trophy,
} from "lucide-react";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [studentData, setStudentData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/student").then(res => setStudentData(res.data));
    axios.get("http://localhost:5000/courses").then(res => setCourses(res.data));
    axios.get("http://localhost:5000/achievements").then(res => setAchievements(res.data));
    axios.get("http://localhost:5000/activities").then(res => setActivities(res.data));
  }, []);

  if (!studentData) return <div className="student-profile-main">Loading...</div>;

  return (
    <div className="student-profile-main">
      <div className="profile-card">
        <div className="profile-header">
          {/* Use useNavigate for reliable navigation */}
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={18} /> Back
          </button>
          <h1 className="profile-title">Student Profile</h1>
          <button className="profile_logout-btn" onClick={() => navigate("/")}>
            Logout
          </button>
        </div>

        <div className="student-info">
          <div className="avatar">{studentData.name.split(" ")[0][0]}</div>
          <div className="student-details">
            <h2>{studentData.name}</h2>
            <span className="status">{studentData.status}</span>
            <p>ID: {studentData.id}</p>
            <p>{studentData.major} • {studentData.year}</p>
            <div className="contact-info">
              <p><Mail size={14} /> {studentData.email}</p>
              <p><Phone size={14} /> {studentData.phone}</p>
            </div>
          </div>
        </div>

        <div className="tabs">
          {["overview", "academics", "achievements", "activity"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="tab-panel">
          {activeTab === "overview" && (
            <div className="tab-content overview-tab">
              <div className="overview-cards">
                <div className="overview-card">
                  <Trophy size={22} color="#ffb300" />
                  <div>
                    <h3>{studentData.gpa}</h3>
                    <p>Current GPA</p>
                  </div>
                </div>
                <div className="overview-card">
                  <BookOpen size={22} color="#007bff" />
                  <div>
                    <h3>{courses.length}</h3>
                    <p>Current Courses</p>
                  </div>
                </div>
                <div className="overview-card">
                  <Calendar size={22} color="#28a745" />
                  <div>
                    <h3>{studentData.enrollmentDate}</h3>
                    <p>Enrolled Since</p>
                  </div>
                </div>
              </div>
              <div className="contact-card">
                <h4>Address</h4>
                <p><MapPin size={14} /> {studentData.address}</p>
              </div>
            </div>
          )}

          {activeTab === "academics" && (
            <div className="tab-content">
              <table className="academics-table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Credits</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course.code}>
                      <td>{course.code}</td>
                      <td>{course.name}</td>
                      <td>{course.credits}</td>
                      <td>{course.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "achievements" && (
            <div className="tab-content achievements-tab">
              {achievements.map((a, i) => (
                <div key={i} className="achievement-card">
                  <div>
                    <h4>{a.title}</h4>
                    <p>{a.date}</p>
                  </div>
                  <span className="badge">{a.type}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="tab-content activity-tab">
              {activities.map((act, i) => (
                <div key={i} className="activity-card">
                  <div>
                    <h4>{act.activity}</h4>
                    <p>{act.date}</p>
                  </div>
                  <span className="badge">{act.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
