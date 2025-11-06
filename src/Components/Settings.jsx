import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Settings.css";


export default function Settings() {
    const navigate = useNavigate();
    const handleLogout = () => {
      navigate("/login"); 
    };

  // Institution info (static, or use useState/props if needed)
  const institution = {
    name: "Springfield University",
    code: "SPU-2024",
    address: "123 University Ave, Springfield",
    phone: "+1 (555) 123-4567",
    email: "admin@springfield.edu",
    website: "https://www.springfield.edu"
  };

  // Calendar state and event logic
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    { date: "2025-11-03", title: "Board Meeting", time: "10:00 AM", type: "meeting" },
    { date: "2025-11-03", title: "Math Deadline", time: "4:00 PM", type: "deadline" },
    { date: "2025-11-07", title: "School Holiday", time: "", type: "holiday" },
    { date: "2025-11-08", title: "Admissions Webinar", time: "2:00 PM", type: "meeting" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: selectedDate,
    title: "",
    time: "",
    type: "meeting",
    description: ""
  });

  const formatDate = d => d.toISOString().slice(0, 10);

  const eventsForSelected = events.filter(
    ev => ev.date === formatDate(selectedDate)
  );
  const eventDates = events.map(ev => ev.date);

  const handleAddEvent = (e) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, date: formatDate(newEvent.date) }]);
    setShowModal(false);
    setNewEvent({
      date: selectedDate,
      title: "",
      time: "",
      type: "meeting",
      description: ""
    });
  };

  function tileContent({ date, view }) {
    if (view === 'month' && eventDates.includes(formatDate(date))) {
      return <span className="event-dot" />;
    }
    return null;
  }

  function tileClassName({ date, view }) {
    if (view === 'month' && eventDates.includes(formatDate(date))) {
      return 'has-event';
    }
    return null;
  }

  const renderModal = () => (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h3 className="modal-title">Add Event</h3>
        <form className="modal-form" onSubmit={handleAddEvent}>
          <label>
            Title
            <input
              type="text"
              required
              value={newEvent.title}
              onChange={e => setNewEvent(ev => ({ ...ev, title: e.target.value }))}
            />
          </label>
          <label>
            Date
            <input
              type="date"
              required
              value={formatDate(newEvent.date)}
              onChange={e => setNewEvent(ev => ({ ...ev, date: new Date(e.target.value) }))}
            />
          </label>
          <label>
            Time
            <input
              type="time"
              value={newEvent.time}
              onChange={e => setNewEvent(ev => ({ ...ev, time: e.target.value }))}
            />
          </label>
          <label>
            Type
            <select
              value={newEvent.type}
              onChange={e => setNewEvent(ev => ({ ...ev, type: e.target.value }))}
            >
              <option value="meeting">Meeting</option>
              <option value="deadline">Deadline</option>
              <option value="holiday">Holiday</option>
              <option value="reminder">Reminder</option>
            </select>
          </label>
          <label>
            Description
            <textarea
              rows={2}
              value={newEvent.description}
              onChange={e => setNewEvent(ev => ({ ...ev, description: e.target.value }))}
            />
          </label>
          <div className="modal-actions">
            <button type="submit" className="modal-save">Save Event</button>
            <button type="button" className="modal-cancel" onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );

  const getEventColor = (type) => {
    switch(type) {
      case "meeting": return "#2563eb";
      case "deadline": return "#eab308";
      case "holiday": return "#22c55e";
      case "reminder": return "#8b5cf6";
      default: return "#2563eb";
    }
  };

  return (
    <div className="settings-container">
      {/* Institution Info Card */}
            <div className="settings-header">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
            <AiOutlineArrowLeft size={18} /> Back
        </button>
        <h2 className="settings-title">Settings</h2>
        <button className="Setting_logout-btn" onClick={handleLogout}>
            Logout
        </button>
        </div>
Setting_
      <div className="institution-card settings-card">
        <h3 className="section-title">Institution Information</h3>
        <div className="institution-info-grid">
          <div>
            <label>Institution Name</label>
            <div className="info-value">{institution.name}</div>
          </div>
          <div>
            <label>Institution Code</label>
            <div className="info-value">{institution.code}</div>
          </div>
          <div>
            <label>Address</label>
            <div className="info-value">{institution.address}</div>
          </div>
          <div>
            <label>Phone</label>
            <div className="info-value">{institution.phone}</div>
          </div>
          <div>
            <label>Email</label>
            <div className="info-value">{institution.email}</div>
          </div>
          <div>
            <label>Website</label>
            <div className="info-value">{institution.website}</div>
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="calendar-card settings-card">
        <div className="calendar-header">
          <h2 className="calendar-title">Academic Calendar</h2>
          <button className="add-event-btn" onClick={() => setShowModal(true)}>+ Add Event</button>
        </div>
        <div className="calendar-widget">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
            tileClassName={tileClassName}
            locale="en-US"
          />
        </div>
        <div className="event-list-section">
          <h3 className="events-for-date-title">
            Events for {selectedDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
          </h3>
          {eventsForSelected.length === 0 ? (
            <p className="no-events">No events or reminders for this day.</p>
          ) : (
            <ul className="event-list">
              {eventsForSelected.map((ev, idx) => (
                <li key={idx} className="event-item">
                  <span
                    className="event-color-dot"
                    style={{ background: getEventColor(ev.type) }}
                  />
                  <span className="event-title">{ev.title}</span>
                  {ev.time && <span className="event-time">@ {ev.time}</span>}
                  <span className="event-type">{ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}</span>
                  {ev.description && <span className="event-desc">{ev.description}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
        {showModal && renderModal()}
      </div>
    </div>
  );
}
