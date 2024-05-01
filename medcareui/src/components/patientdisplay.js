import React, { useState, useEffect } from 'react';
import './css/patientdisplay.css';
import axios from 'axios';

function PatientDisplay() {
    const [patients, setPatients] = useState([]);

    const fetchPatientData = async (e) => {
        try {
            const response = await axios.get('http://localhost:5000/patients');
            const data = response.data;
            setPatients(data); // Set the state with the fetched data
            console.log(patients)
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

    // useEffect hook to log the patients state whenever it changes
    // useEffect(() => {
    //     console.log("Patients state updated:", patients);
    // }, [patients]); // This effect depends on `patients` and runs whenever `patients` changes

    return (
        <div className="container">
    <button onClick={fetchPatientData}>Load Patient Data</button>
    <div className="patient-data">
        {patients.length > 0 ? (
            <ol> {/* This ordered list now correctly wraps all patients */}
                {patients.map((patient) => (
                    <li key={patient.PatientId || patient.id}> {/* Use PatientId or a fallback like id as a key */}
                        <div><strong>Name:</strong> {patient.FirstName} {patient.LastName}</div>
                        <div><strong>ID:</strong> {patient.PatientID}</div>
                        <div><strong>Date of Birth:</strong> {patient.DOB}</div>
                        <div><strong>Contact:</strong> {patient.ContactNumber}</div>
                        <div><strong>Email:</strong> {patient.EmailAddress}</div>
                    </li>
                ))}
            </ol>
        ) : (
            <p>No patient data available.</p>
        )}
    </div>
</div>
    );
}

export default PatientDisplay;
