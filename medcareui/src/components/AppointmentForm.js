import React, { useState } from 'react';
import axios from 'axios';
import './css/AppointmentForm.css';
// const mongoose = require("mongoose");

function AppointmentForm() {
    const [formData, setFormData] = useState({
        AppointmentID: '',
        PatientID: '',
        ProviderID: '',
        StaffID: '',
        AppointmentDate: '',
        AppointmentTime: '',
        Purpose: '',
        Status: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData);
            const response = await axios.post('http://localhost:5000/appointments', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // if (response.status == 200) {
            //     alert('Record created successfully!');
            // }
            console.log('Submission successful', response.data);
            alert('Appointment Record created successfully!');
            setFormData({
                AppointmentID: '',
        PatientID: '',
        ProviderID: '',
        StaffID: '',
        AppointmentDate: '',
        AppointmentTime: '',
        Purpose: '',
        Status: ''
            });

            // Handle response and further actions like redirecting or showing success message
        } catch (error) {
            console.error('Submission failed', error);
            // Handle errors, e.g., show error message to user
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <h1 className='title'>Appointments</h1>
                {/* <h2>Form submitted succesfully</h2> */}
                <input name="AppointmentID" value={formData.AppointmentID} onChange={handleInputChange} placeholder="Appointment ID" required />
                <input name="PatientID" value={formData.PatientID} onChange={handleInputChange} placeholder="Patient ID" required />
                <input name="ProviderID" value={formData.ProviderID} onChange={handleInputChange} placeholder="Provider ID" required />
                <input name="StaffID" value={formData.StaffID} onChange={handleInputChange} placeholder="Staff ID" required />
                <input type="date" name="AppointmentDate" value={formData.AppointmentDate} onChange={handleInputChange} placeholder="Appointment Date" required />
                <input type="time" name="AppointmentTime" value={formData.AppointmentTime} onChange={handleInputChange} placeholder="Appointment Time" required />
                <input name="Purpose" value={formData.Purpose} onChange={handleInputChange} placeholder="Purpose" required />
                <select name="Status" value={formData.Status} onChange={handleInputChange} required>
                    <option value="">Select Status</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AppointmentForm;
