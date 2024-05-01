import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaffForm from './components/StaffForm';
import Login from './components/Login';
import Patients from './components/Patients';
import EMRForm from './components/EMRForm';
import HealthcareProviderForm from './components/HealthcareProviderForm';
import AppointmentForm from './components/AppointmentForm';
import PatientDisplay from './components/patientdisplay';
import HCPDisplay from './components/HCPDisplay';
import StaffDisplay from './components/StaffDisplay';
import AppointmentDisplay from './components/AppointmentDisplay';

export default function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/staffform" element={<StaffForm />} />
          <Route path="/patientform" element={<Patients />} />
          <Route path="/emrform" element={<EMRForm />} />
          <Route path="/hcpform" element={<HealthcareProviderForm />} />
          <Route path="/appointmentform" element={<AppointmentForm />} />
          <Route path="/patientdisplay" element={<PatientDisplay />} />
          <Route path="/hcpdisplay" element={<HCPDisplay />} />
          <Route path="/staffdisplay" element={<StaffDisplay />} />
          <Route path="/appointmentdisplay" element={<AppointmentDisplay />} />
          {/* <Route path="/appointmentdisplay" element={<AppointmentDisplay />} /> */}

        </Routes>
      </div>
    </Router>
  );
};