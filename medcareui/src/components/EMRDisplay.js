import React, { useState, useEffect } from 'react';
import './css/EMRDisplay.css';  // Ensure CSS is appropriately set up for this component
import axios from 'axios';

function EMRDisplay() {
    const [emrRecords, setEmrRecords] = useState([]);
    const [deleteId, setDeleteId] = useState('');

    const fetchEmrData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/emr');
            setEmrRecords(response.data);
            console.log('response.data',response.data);
            console.log('emrRecords',emrRecords);
            console.log('EMR data fetched and state set');
        } catch (error) {
            console.error('Failed to fetch EMR data:', error);
        }
    };

    const deleteEmrData = async () => {
        if (!deleteId) {
            alert('Please enter a valid EMR Record ID to delete.');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:5000/emr/${deleteId}`);
            console.log('Deletion successful', response.data);
            alert('EMR Record deleted successfully!');
            setDeleteId(''); // Clear the input field after successful deletion
            fetchEmrData(); // Refresh the EMR data
        } catch (error) {
            console.error('Failed to delete EMR:', error);
            alert('Failed to delete EMR!');
        }
    };

    const handleDeleteIdChange = (e) => {
        setDeleteId(e.target.value);
    };

    useEffect(() => {
        fetchEmrData();
    }, []);

    return (
        <div className="container">
            <button onClick={fetchEmrData}>Load EMR Data</button>
            <div className="emr-data">
                {emrRecords.length > 0 ? (
                <ol>
                    {emrRecords.map((record) => (
                        <li key={record.RecordID || record.id}>
                            <div><strong>Record ID:</strong> {record.RecordID}</div>
                            <div><strong>Patient ID:</strong> {record.PatientID}</div>
                            <div><strong>Provider ID:</strong> {record.ProviderID}</div>
                            <div><strong>Staff ID:</strong> {record.StaffID}</div>
                            <div><strong>Vital Signs:</strong> HR: {record.VitalSigns.HeartRate}, BP: {record.VitalSigns.BloodPressure}, Temp: {record.VitalSigns.BodyTemperature}, O2 Sat: {record.VitalSigns.OxygenSaturation}</div>
                            <div><strong>Medical Notes:</strong> {record.MedicalNotes}</div>
                            <div><strong>Diagnoses:</strong> {record.Diagnoses.join(', ')}</div>
                            <div><strong>Treatments:</strong> {record.Treatments.join(', ')}</div>
                            <div><strong>Medications:</strong> {record.Medications.join(', ')}</div>
                            {record.RadiologyImages.map((image, index) => (
                                <img key={index} src={`data:image/jpeg;base64,${image}`} alt="Radiology Image" style={{ width: '400px', height: '300px' }} />
                            ))}
                            <div><strong>Lab Test Results:</strong> {record.LabTestResults.join(', ')}</div>
                        </li>
                    ))}
                </ol>
                ) : (
                    <p>No EMR data available.</p>
                )}
            </div>
            <div className="delete-section">
                <input
                    type="text"
                    value={deleteId}
                    onChange={handleDeleteIdChange}
                    placeholder="Enter EMR Record ID to delete"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={deleteEmrData}>Delete EMR</button>
            </div>
        </div>
    );
}

export default EMRDisplay;
