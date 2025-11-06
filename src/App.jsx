import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/LoginPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './Components/Dashboard';
import StudentProfile from './Components/StudentProfile';
import CourseManagement from './Components/CourseManagement';
import ScheduleManagement from './Components/ScheduleManagement';
import Analytics from './Components/Analytics';
import Reports from './Components/Reports';
import FinancePage from './Components/FinancePage';
import Admissions from './Components/Admissions';
import Settings from './Components/Settings';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student-profile" element={<StudentProfile/>} />
        <Route path="/course-management" element={<CourseManagement/>} />
        <Route path="/schedule-management" element={<ScheduleManagement/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path='/finance' element={<FinancePage/>}/>
        <Route path='/admissions' element ={<Admissions/>} />
        <Route path='/settings' element = {<Settings/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
