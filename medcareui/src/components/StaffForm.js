import React, { useState } from 'react';
import axios from 'axios';
import './css/StaffForm.css'; // Adjust the path as needed based on your project structure

const StaffForm = () => {
    const [formData, setFormData] = useState({
      StaffID: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Role: '',
      ContactNumber: '',
      EmailAddress: '',
      Designation: ''
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
            const response = await axios.post('http://localhost:5000/staff', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Submission successful', response.data);
            alert('Staff Record created successfully!');
            setFormData({
              StaffID: '',
              FirstName: '',
              MiddleName: '',
              LastName: '',
              Role: '',
              ContactNumber: '',
              EmailAddress: '',
              Designation: ''
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h2 className='title'>Staff Details</h2>
                <input name="StaffID" value={formData.StaffID} onChange={handleInputChange} placeholder="Staff ID" required />
                <input name="FirstName" value={formData.FirstName} onChange={handleInputChange} placeholder="First Name" required />
                <input name="MiddleName" value={formData.MiddleName} onChange={handleInputChange} placeholder="Middle Name" />
                <input name="LastName" value={formData.LastName} onChange={handleInputChange} placeholder="Last Name" required />
                <input name="Role" value={formData.Role} onChange={handleInputChange} placeholder="Role" required />
                <input type="tel" name="ContactNumber" value={formData.ContactNumber} onChange={handleInputChange} placeholder="Contact Number" required />
                <input type="email" name="EmailAddress" value={formData.EmailAddress} onChange={handleInputChange} placeholder="Email Address" required />
                <input name="Designation" value={formData.Designation} onChange={handleInputChange} placeholder="Designation" required />
                <button type="submit">Create Staff</button>
            </form>
        </div>
    );
};

export default StaffForm;
