import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, Search, Plus, BookOpen, Users, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CourseManagement.css";

export default function CourseManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-courses");
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: "",
    name: "",
    instructor: "",
    department: "",
    credits: "",
    enrolled: "",
    capacity: "",
    schedule: "",
    status: "Active",
    rating: "0"
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/courseManagement").then(res => setCourses(res.data));
    axios.get("http://localhost:5000/departments").then(res => setDepartments(res.data));
  }, []);

  // Filter logic
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add Course Logic
  const handleAddCourse = async (e) => {
    e.preventDefault();

    // Create the new course entry
    await axios.post('http://localhost:5000/courseManagement', newCourse);

    // Immediately reload courses from API, close modal & reset
    axios.get("http://localhost:5000/courseManagement").then(res => setCourses(res.data));
    setShowModal(false);
    setNewCourse({
      id: "",
      name: "",
      instructor: "",
      department: "",
      credits: "",
      enrolled: "",
      capacity: "",
      schedule: "",
      status: "Active",
      rating: "0"
    });
  };

  return (
    <div className="course-management-container">
      <div className="course-card">
        <div className="course-header">
          <div className="header-left">
            <button className="icon-btn" onClick={() => navigate("/dashboard")}>
              <ArrowLeft size={18} />
            </button>
            <h1>Course Management</h1>
          </div>
          <div className="header-right">
            <button className="add-btn" onClick={() => setShowModal(true)}>
              <Plus size={16} /> Add Course
            </button>
            <button className="component_logout-btn" onClick={() => navigate("/")}>Logout</button>
          </div>
        </div>

        <div className="search-bar">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search courses, instructors, or course codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="tabs">
          <button
            className={activeTab === "all-courses" ? "active" : ""}
            onClick={() => setActiveTab("all-courses")}
          >
            All Courses
          </button>
          <button
            className={activeTab === "departments" ? "active" : ""}
            onClick={() => setActiveTab("departments")}
          >
            Departments
          </button>
          <button
            className={activeTab === "enrollment" ? "active" : ""}
            onClick={() => setActiveTab("enrollment")}
          >
            Enrollment
          </button>
        </div>

        {/* ======= All Courses ======= */}
        {activeTab === "all-courses" && (
          <div className="tab-content">
            {filteredCourses.map((course) => (
              <div key={course.id} className="course-item">
                <div className="course-details">
                  <div className="course-header-info">
                    <h3>{course.name}</h3>
                    <span className="badge code">{course.id}</span>
                    <span className="badge status">{course.status}</span>
                  </div>
                  <div className="course-meta">
                    <p><BookOpen size={14} /> {course.instructor}</p>
                    <p><Users size={14} /> {course.enrolled}/{course.capacity} students</p>
                    <p><Clock size={14} /> {course.schedule}</p>
                    <p><Star size={14} className="star" /> {course.rating}/5.0</p>
                  </div>
                </div>
                <div className="course-actions">
                  <button>Edit</button>
                  <button>View</button>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${(course.enrolled / course.capacity) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======= Departments ======= */}
        {activeTab === "departments" && (
          <div className="tab-content dept-tab">
            {departments.map((dept) => (
              <div key={dept.name} className="dept-card">
                <h3>{dept.name}</h3>
                <p>Total Courses: {dept.courses}</p>
                <p>Total Students: {dept.students}</p>
                <p>Avg per Course: {Math.round(dept.students / dept.courses)}</p>
                <button className="view-btn">View Details</button>
              </div>
            ))}
          </div>
        )}

        {/* ======= Enrollment ======= */}
        {activeTab === "enrollment" && (
          <div className="tab-content enrollment-tab">
            <div className="enrollment-stats">
              <div><h2>130</h2><p>Total Enrolled</p></div>
              <div><h2>145</h2><p>Total Capacity</p></div>
              <div><h2>89.7%</h2><p>Utilization Rate</p></div>
            </div>

            <div className="recent-enrollments">
              <h3>Recent Enrollments</h3>
              <div className="enrollment-item">
                <p><strong>Sarah Johnson</strong> enrolled in CS-101</p>
                <span className="badge new">New</span>
              </div>
              <div className="enrollment-item">
                <p><strong>Michael Chen</strong> enrolled in MATH-201</p>
                <span className="badge new">New</span>
              </div>
              <div className="enrollment-item">
                <p><strong>Emily Davis</strong> dropped ENG-102</p>
                <span className="badge drop">Drop</span>
              </div>
            </div>
          </div>
        )}

        {/* ======= Add Course Modal ======= */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Add New Course</h2>
              <form onSubmit={handleAddCourse}>
                <input
                  type="text"
                  placeholder="Course ID"
                  value={newCourse.id}
                  required
                  onChange={e => setNewCourse({...newCourse, id: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Course Name"
                  value={newCourse.name}
                  required
                  onChange={e => setNewCourse({...newCourse, name: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Instructor"
                  value={newCourse.instructor}
                  onChange={e => setNewCourse({...newCourse, instructor: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={newCourse.department}
                  onChange={e => setNewCourse({...newCourse, department: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Credits"
                  value={newCourse.credits}
                  onChange={e => setNewCourse({...newCourse, credits: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Enrolled"
                  value={newCourse.enrolled}
                  onChange={e => setNewCourse({...newCourse, enrolled: e.target.value})}
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={newCourse.capacity}
                  onChange={e => setNewCourse({...newCourse, capacity: e.target.value})}
                />
                <input
                  type="text"
                  placeholder="Schedule"
                  value={newCourse.schedule}
                  onChange={e => setNewCourse({...newCourse, schedule: e.target.value})}
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Rating"
                  value={newCourse.rating}
                  onChange={e => setNewCourse({...newCourse, rating: e.target.value})}
                />
                <div className="modal-actions">
                  <button type="submit">Add</button>
                  <button type="button" onClick={()=>setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
