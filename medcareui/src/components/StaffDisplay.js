import React, { useState, useEffect } from 'react';
import './css/StaffDisplay.css';
import axios from 'axios';

function StaffDisplay() {
    const [staff, setStaff] = useState([]);
    const [deleteId, setDeleteId] = useState(''); // State to hold the ID to delete

    const fetchStaffData = async (e) => {
        try {
            const response = await axios.get('http://localhost:5000/staff');
            const data = response.data;
            setStaff(data); // Set the state with the fetched data
            console.log(staff)
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

    
    const deleteStaffData = async () => {
        if (!deleteId) {
            alert('Please enter a valid Staff ID to delete.');
            return;
        }
        try {
            const response = await axios.delete(`http://localhost:5000/staff/${deleteId}`);
            console.log('Deletion successful', response.data);
            alert('Staff deleted successfully!');
            setDeleteId(''); // Clear the input field after successful deletion
            fetchStaffData(); // Refresh the appointment data
        } catch (error) {
            console.error('Failed to delete staff:', error);
            alert('Failed to delete staff!');
        }
    };

    const handleDeleteIdChange = (e) => {
        setDeleteId(e.target.value);
    };

    // useEffect hook to log the staff state whenever it changes
    // useEffect(() => {
    //     console.log("staff state updated:", staff);
    // }, [staff]); // This effect depends on `staff` and runs whenever `staff` changes

    return (
        <div className="container">
    <button onClick={fetchStaffData}>Load Staff Data</button>
    <div className="hcp-data">
        {staff.length > 0 ? (
            <ol> {/* This ordered list now correctly wraps all staff */}
                {staff.map((staff) => (
                    <li key={staff.StaffID || staff.id}> {/* Use PatientId or a fallback like id as a key */}
                        <div><strong>Name:</strong> {staff.FirstName} {staff.LastName}</div>
                        <div><strong>ID:</strong> {staff.StaffID}</div>
                        <div><strong>Role:</strong> {staff.Role}</div>
                        <div><strong>Contact:</strong> {staff.ContactNumber}</div>
                        <div><strong>Email:</strong> {staff.EmailAddress}</div>
                    </li>
                ))}
            </ol>
        ) : (
            <p>No Staff data available.</p>
        )}
    </div>
    <div className="delete-section">
                <input
                    type="text"
                    value={deleteId}
                    onChange={handleDeleteIdChange}
                    placeholder="Enter StaffID ID to delete"
                    style={{ marginRight: '10px' }}
                />
                <button onClick={deleteStaffData}>Delete Staff</button>
            </div>
</div>
    );
}

export default StaffDisplay;
