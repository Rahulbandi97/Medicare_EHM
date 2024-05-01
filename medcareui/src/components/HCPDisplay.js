import React, { useState, useEffect } from 'react';
import './css/HCPDisplay.css';
import axios from 'axios';

function HCPDisplay() {
    const [hcps, setHcp] = useState([]);

    const fetchHcpData = async (e) => {
        try {
            const response = await axios.get('http://localhost:5000/healthcareProviders');
            const data = response.data;
            setHcp(data); // Set the state with the fetched data
            console.log(hcps)
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

    // useEffect hook to log the hcps state whenever it changes
    // useEffect(() => {
    //     console.log("hcps state updated:", hcps);
    // }, [hcps]); // This effect depends on `hcps` and runs whenever `hcps` changes

    return (
        <div className="container">
    <button onClick={fetchHcpData}>Load HCP Data</button>
    <div className="hcp-data">
        {hcps.length > 0 ? (
            <ol> {/* This ordered list now correctly wraps all hcps */}
                {hcps.map((healthcareProviders) => (
                    <li key={healthcareProviders.ProviderId || healthcareProviders.id}> {/* Use PatientId or a fallback like id as a key */}
                        <div><strong>Name:</strong> {healthcareProviders.FirstName} {healthcareProviders.LastName}</div>
                        <div><strong>ID:</strong> {healthcareProviders.ProviderID}</div>
                        <div><strong>Designation:</strong> {healthcareProviders.Designation}</div>
                        <div><strong>Contact:</strong> {healthcareProviders.ContactNumber}</div>
                        <div><strong>Email:</strong> {healthcareProviders.EmailAddress}</div>
                    </li>
                ))}
            </ol>
        ) : (
            <p>No HCP data available.</p>
        )}
    </div>
</div>
    );
}

export default HCPDisplay;
