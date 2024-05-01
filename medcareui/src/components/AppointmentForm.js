import React, { useState } from 'react';
import './css/AppointmentForm.css'

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
        console.log(formData)
        try {
            const response = await fetch('https://your-api-url/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log('Submission successful', data);
            // Handle response and further actions like redirecting or showing success message
        } catch (error) {
            console.error('Submission failed', error);
            // Handle errors, e.g., show error message to user
        }
    };

    return (
        <div className='container'>
            {/* <h1>Appointments</h1> */}
            <form onSubmit={handleSubmit}>
                <h1 className='title'>Appointments</h1>
                <input name="AppointmentID" value={formData.AppointmentID} onChange={handleInputChange} placeholder="Appointment ID" required />
                <input name="PatientID" value={formData.PatientID} onChange={handleInputChange} placeholder="Patient ID" required />
                <input name="ProviderID" value={formData.ProviderID} onChange={handleInputChange} placeholder="Provider ID" required />
                <input name="StaffID" value={formData.StaffID} onChange={handleInputChange} placeholder="Staff ID" required />
                <input type="date" name="AppointmentDate" value={formData.AppointmentDate} onChange={handleInputChange} placeholder="Appointment Date" required />
                <input name="AppointmentTime" value={formData.AppointmentTime} onChange={handleInputChange} placeholder="Appointment Time" required />
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