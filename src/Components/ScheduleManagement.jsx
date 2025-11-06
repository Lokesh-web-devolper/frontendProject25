import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import './ScheduleManagement.css';

export default function ScheduleManagement() {
  const navigate = useNavigate();
  const [selectedView, setSelectedView] = useState('week');
  const [scheduleData, setScheduleData] = useState({});
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/schedule').then(res => setScheduleData(res.data));
    axios.get('http://localhost:5000/rooms').then(res => setRooms(res.data));
  }, []);

  // These match your API keys/structure
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const periodNumbers = Array.from({ length: 24 }, (_, i) => (i + 1).toString());

  const getClassForSlot = (day, period) =>
    scheduleData?.[day] && scheduleData[day][period] ? scheduleData[day][period] : null;

  const getColorForCourse = (courseId) => {
    if (!courseId) return 'gray';
    if (/CS/.test(courseId)) return 'blue';
    if (/MATH|AD2/.test(courseId)) return 'green';
    if (/DCS/.test(courseId)) return 'purple';
    if (/SP/.test(courseId)) return 'teal';
    if (/UC/.test(courseId)) return 'orange';
    if (/HIST/.test(courseId)) return 'gold';
    return 'gray';
  };

  return (
    <div className="schedule-container">
      <div className="header">
        <div className="header-left">
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={18} /> Back
          </button>
          <h1>Schedule Management</h1>
        </div>
        <div className="header-right">
          <button className="add-btn">
            <Plus size={16} /> Add Class
          </button>
          <button className="Sechudule_logout-btn" onClick={() => navigate("/")}>Logout</button>
        </div>
      </div>

      <div className="view-switch">
        <button
          className={selectedView === 'week' ? 'active' : ''}
          onClick={() => setSelectedView('week')}
        >
          Week View
        </button>
        <button
          className={selectedView === 'room' ? 'active' : ''}
          onClick={() => setSelectedView('room')}
        >
          Room Management
        </button>
      </div>

      {selectedView === 'week' && (
        <div className="week-view">
          <table>
            <thead>
              <tr>
                <th>Day</th>
                {periodNumbers.map(period => <th key={period}>{period}</th>)}
              </tr>
            </thead>
            <tbody>
              {daysOfWeek.map(day => (
                <tr key={day}>
                  <td className="time-cell">{day}</td>
                  {periodNumbers.map(period => {
                    const classInfo = getClassForSlot(day, period);
                    return (
                      <td key={`${day}-${period}`}>
                        {classInfo && (
                          <div className={`class-card ${getColorForCourse(classInfo.course)}`}>
                            <strong>{classInfo.course}</strong>
                            <div className="room-info">
                              <MapPin size={12} />
                              <span>{classInfo.room}</span>
                            </div>
                            <small>{classInfo.instructor}</small>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedView === 'room' && (
        <div className="room-view">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <div className="room-header">
                <h3>{room.id}</h3>
                <span className="badge">{room.type}</span>
              </div>
              <p><strong>Capacity:</strong> {room.capacity} students</p>
              <p><strong>Equipment:</strong> {room.equipment.join(', ')}</p>
              <button className="manage-btn">Manage Room</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
