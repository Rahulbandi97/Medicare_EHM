import React, { useState } from 'react';
import './css/patientdisplay.css';
import axios from 'axios';

function PatientDisplay() {
    const [patients, setPatients] = useState([]);
    const [deleteId, setDeleteId] = useState(''); // State to hold the ID to delete

    const fetchPatientData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/patients');
            setPatients(response.data); // Set the state with the fetched data
        } catch (error) {
            console.error('Failed to fetch patient data:', error);
        }
    };

    const deletePatientData = async () => {
        if (!deleteId) {
            alert('Please enter a valid Patient ID to delete.');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:5000/patients/${deleteId}`);
            alert('Patient deleted successfully!');
            setDeleteId(''); // Clear the input field after successful deletion
            fetchPatientData(); // Refresh the patient data
        } catch (error) {
            console.error('Failed to delete patient:', error);
            alert('Failed to delete patient!');
        }
    };

    const handleDeleteIdChange = (event) => {
        setDeleteId(event.target.value);
    };

    return (
        <div className="container">
            <button onClick={fetchPatientData}>Load Patient Data</button>
            <div className="patient-data">
                {patients.length > 0 ? (
                    <ol>
                        {patients.map((patient) => (
                            <li key={patient.PatientId || patient.id}>
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
            <div className="delete-section">
                <input
                    type="text"
                    value={deleteId}
                    onChange={handleDeleteIdChange}
                    placeholder="Enter Patient ID to delete"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={deletePatientData}>Delete Patient</button>
            </div>
        </div>
    );
}

export default PatientDisplay;
