import React, { useState } from 'react';
import './css/StaffDisplay.css';
import axios from 'axios';

function AppointmentDisplay() {
    const [appointments, setAppointments] = useState([]);
    const [deleteId, setDeleteId] = useState(''); // State to hold the ID to delete

    const fetchAppointmentData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/appointments');
            setAppointments(response.data);
            console.log('Data fetched and state set');
        } catch (error) {
            console.error('Failed to fetch appointment data:', error);
        }
    };

    const deleteAppointmentData = async () => {
        if (!deleteId) {
            alert('Please enter a valid Appointment ID to delete.');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:5000/appointments/${deleteId}`);
            console.log('Deletion successful', response.data);
            alert('Appointment deleted successfully!');
            setDeleteId(''); // Clear the input field after successful deletion
            fetchAppointmentData(); // Refresh the appointment data
        } catch (error) {
            console.error('Failed to delete appointment:', error);
            alert('Failed to delete appointment!');
        }
    };

    const handleDeleteIdChange = (e) => {
        setDeleteId(e.target.value);
    };

    return (
        <div className="container">
            <button onClick={fetchAppointmentData}>Load Appointment Data</button>
            <div className="appointment-data">
                {appointments.length > 0 ? (
                <ol>
                    {appointments.map((appointment) => (
                        <li key={appointment.AppointmentID || appointment.id}>
                            <div><strong>Appointment ID:</strong> {appointment.AppointmentID}</div>
                            <div><strong>Patient ID:</strong> {appointment.PatientID}</div>
                            <div><strong>HCP ID:</strong> {appointment.ProviderID}</div>
                            <div><strong>Staff ID:</strong> {appointment.StaffID}</div>
                            <div><strong>Appointment Date:</strong> {appointment.AppointmentDate}</div>
                            <div><strong>Appointment Time:</strong> {appointment.AppointmentTime}</div>
                            <div><strong>Purpose:</strong> {appointment.Purpose}</div>
                            <div><strong>Status:</strong> {appointment.Status}</div>
                        </li>
                    ))}
                </ol>
                ) : (
                    <p>No Appointment data available.</p>
                )}
            </div>
            <div className="delete-section">
                <input
                    type="text"
                    value={deleteId}
                    onChange={handleDeleteIdChange}
                    placeholder="Enter Appointment ID to delete"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={deleteAppointmentData}>Delete Appointment</button>
            </div>
        </div>
    );
}

export default AppointmentDisplay;
