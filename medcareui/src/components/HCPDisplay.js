import React, { useState } from 'react';
import './css/HCPDisplay.css';
import axios from 'axios';

function HCPDisplay() {
    const [hcps, setHcps] = useState([]);
    const [deleteId, setDeleteId] = useState(''); // State to hold the ID to delete

    const fetchHcpData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/healthcareProviders');
            setHcps(response.data); // Set the state with the fetched data
            console.log('Data fetched and state set');
        } catch (error) {
            console.error('Failed to fetch HCP data:', error);
        }
    };

    const deleteHcpData = async () => {
        if (!deleteId) {
            alert('Please enter a valid HCP ID to delete.');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:5000/healthcareProviders/${deleteId}`);
            console.log('Deletion successful', response.data);
            alert('HCP deleted successfully!');
            setDeleteId(''); // Clear the input field after successful deletion
            fetchHcpData(); // Refresh the HCP data
        } catch (error) {
            console.error('Failed to delete HCP:', error);
            alert('Failed to delete HCP!');
        }
    };

    const handleDeleteIdChange = (e) => {
        setDeleteId(e.target.value);
    };

    return (
        <div className="container">
            <button onClick={fetchHcpData}>Load HCP Data</button>
            <div className="hcp-data">
                {hcps.length > 0 ? (
                <ol>
                    {hcps.map((hcp) => (
                        <li key={hcp.ProviderId || hcp.id}>
                            <div><strong>Name:</strong> {hcp.FirstName} {hcp.LastName}</div>
                            <div><strong>ID:</strong> {hcp.ProviderID}</div>
                            <div><strong>Designation:</strong> {hcp.Designation}</div>
                            <div><strong>Contact:</strong> {hcp.ContactNumber}</div>
                            <div><strong>Email:</strong> {hcp.EmailAddress}</div>
                        </li>
                    ))}
                </ol>
                ) : (
                    <p>No HCP data available.</p>
                )}
            </div>
            <div className="delete-section">
                <input
                    type="text"
                    value={deleteId}
                    onChange={handleDeleteIdChange}
                    placeholder="Enter HCP ID to delete"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={deleteHcpData}>Delete HCP</button>
            </div>
        </div>
    );
}

export default HCPDisplay;
