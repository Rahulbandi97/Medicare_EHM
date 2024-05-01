import React, { useState, useEffect } from 'react';
import './css/StaffDisplay.css';
import axios from 'axios';

function AppointmentDisplay() {
    const [appointments, setAppointment] = useState([]);

    const fetchAppointmentData = async (e) => {
        try {
            const response = await axios.get('http://localhost:5000/appointments');
            const data = response.data;
            setAppointment(data); // Set the state with the fetched data
            console.log(appointments)
            console.log('Data fetched and state set');
        } catch (error) {
            console.error('Failed to fetch patient data:', error);
            if (error.response) {
                console.error(error.response.data);
                console.error(error.response.status);
                console.error(error.response.headers);
            } else if (error.request) {
                console.error(error.request);
            } else {
                console.error('Error', error.message);
            }
        }
    };

    // useEffect hook to log the staff state whenever it changes
    // useEffect(() => {
    //     console.log("staff state updated:", staff);
    // }, [staff]); // This effect depends on `staff` and runs whenever `staff` changes

    return (
        <div className="container">
    <button onClick={fetchAppointmentData}>Load Appointment Data</button>
    <div className="hcp-data">
        {appointments.length > 0 ? (
            <ol> {/* This ordered list now correctly wraps all staff */}
                {appointments.map((appointment) => (
                    <li key={appointment.AppointmentID || appointment.id}> {/* Use PatientId or a fallback like id as a key */}
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
</div>
    );
}

export default AppointmentDisplay;
