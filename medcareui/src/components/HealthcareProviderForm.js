import React, { useState } from 'react';
import './css/HealthcareProviderForm.css';


function HealthcareProviderForm() {
    const [formData, setFormData] = useState({
        ProviderID: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Designation: '',
        Specialization: '',
        ContactNumber: '',
        EmailAddress: '',
        Address: {
            Street: '',
            City: '',
            State: '',
            PostalCode: '',
            Country: ''
        }
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('.')) {
            const parts = name.split('.');
            setFormData({
                ...formData,
                Address: {
                    ...formData.Address,
                    [parts[1]]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://your-api-url/providers', {
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
            {/* <h1>Health-Care Provider Form</h1> */}
            <form onSubmit={handleSubmit}>
            <h1 className='title'>Health-Care Provider Form</h1>
                <input name="ProviderID" value={formData.ProviderID} onChange={handleInputChange} placeholder="Provider ID" required />
                <input name="FirstName" value={formData.FirstName} onChange={handleInputChange} placeholder="First Name" required />
                <input name="MiddleName" value={formData.MiddleName} onChange={handleInputChange} placeholder="Middle Name" />
                <input name="LastName" value={formData.LastName} onChange={handleInputChange} placeholder="Last Name" required />
                <input name="Designation" value={formData.Designation} onChange={handleInputChange} placeholder="Designation" required />
                <input name="Specialization" value={formData.Specialization} onChange={handleInputChange} placeholder="Specialization" required />
                <input name="ContactNumber" value={formData.ContactNumber} onChange={handleInputChange} placeholder="Contact Number" required />
                <input name="EmailAddress" value={formData.EmailAddress} onChange={handleInputChange} placeholder="Email Address" required />
                <input name="Address.Street" value={formData.Address.Street} onChange={handleInputChange} placeholder="Street" />
                <input name="Address.City" value={formData.Address.City} onChange={handleInputChange} placeholder="City" />
                <input name="Address.State" value={formData.Address.State} onChange={handleInputChange} placeholder="State" />
                <input name="Address.PostalCode" value={formData.Address.PostalCode} onChange={handleInputChange} placeholder="Postal Code" />
                <input name="Address.Country" value={formData.Address.Country} onChange={handleInputChange} placeholder="Country" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default HealthcareProviderForm;