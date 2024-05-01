import React, { useState } from 'react';
import './css/Patients.css';
import axios from 'axios';

export default function Patients() {
    const [formData, setFormData] = useState({
        PatientID: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        DOB: '',
        Age: '',
        GenderAssignedAtBirth: '',
        PreferredGender: '',
        ContactNumber: '',
        EmailAddress: '',
        EmergencyContact: {
            Name: '',
            Relationship: '',
            ContactInformation: ''
        },
        InsuranceDetails: {
            InsuranceProvider: '',
            PolicyNumber: '',
            GroupPolicyNumber: '',
            EffectiveDate: '',
            ExpirationDate: ''
        },
        MedicalHistory: '',
        Allergies: []
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name.includes('.')) {
            const parts = name.split('.');
            setFormData({
                ...formData,
                [parts[0]]: {
                    ...formData[parts[0]],
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
            console.log(formData);
            const response = await axios.post('http://localhost:5000/patients', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //const data = await response.json();
            console.log('Patient Submission successful', response.data);
            alert('Patient Record created successfully!');
            setFormData({
                PatientID: '',
                FirstName: '',
                MiddleName: '',
                LastName: '',
                DOB: '',
                Age: '',
                GenderAssignedAtBirth: '',
                PreferredGender: '',
                ContactNumber: '',
                EmailAddress: '',
                EmergencyContact: {
                    Name: '',
                    Relationship: '',
                    ContactInformation: ''
                },
                InsuranceDetails: {
                    InsuranceProvider: '',
                    PolicyNumber: '',
                    GroupPolicyNumber: '',
                    EffectiveDate: '',
                    ExpirationDate: ''
                },
                MedicalHistory: '',
                Allergies: []
            });
            // Handle response and further actions like redirecting or showing success message
        } catch (error) {
            console.error('Submission failed', error);
            // Handle errors, e.g., show error message to user
        }
    };

    return (
        <div className="container">
            {/* <h1>Patient Details</h1> */}
            <form onSubmit={handleSubmit}>
                <h1 className='title'>Patient Details</h1>
                <input name="PatientID" value={formData.PatientID} onChange={handleInputChange} placeholder="Patient ID" required />
                <input name="FirstName" value={formData.FirstName} onChange={handleInputChange} placeholder="First Name" required />
                <input name="MiddleName" value={formData.MiddleName} onChange={handleInputChange} placeholder="Middle Name" />
                <input name="LastName" value={formData.LastName} onChange={handleInputChange} placeholder="Last Name" required />
                <input type="date" name="DOB" value={formData.DOB} onChange={handleInputChange} placeholder="Date of Birth" required />
                <input type="number" name="Age" value={formData.Age} onChange={handleInputChange} placeholder="Age" min="0" max="130" required />
                <select name="GenderAssignedAtBirth" value={formData.GenderAssignedAtBirth} onChange={handleInputChange} required>
                    <option value="">Select Gender Assigned at Birth</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <input name="PreferredGender" value={formData.PreferredGender} onChange={handleInputChange} placeholder="Preferred Gender" required />
                <input name="ContactNumber" value={formData.ContactNumber} onChange={handleInputChange} placeholder="Contact Number" required />
                <input name="EmailAddress" value={formData.EmailAddress} onChange={handleInputChange} placeholder="Email Address" required />
                <input name="EmergencyContact.Name" value={formData.EmergencyContact.Name} onChange={handleInputChange} placeholder="Emergency Contact Name" />
                <input name="EmergencyContact.Relationship" value={formData.EmergencyContact.Relationship} onChange={handleInputChange} placeholder="Emergency Contact Relationship" />
                <input name="EmergencyContact.ContactInformation" value={formData.EmergencyContact.ContactInformation} onChange={handleInputChange} placeholder="Emergency Contact Info" />
                <input name="InsuranceDetails.InsuranceProvider" value={formData.InsuranceDetails.InsuranceProvider} onChange={handleInputChange} placeholder="Insurance Provider" />
                <input name="InsuranceDetails.PolicyNumber" value={formData.InsuranceDetails.PolicyNumber} onChange={handleInputChange} placeholder="Policy Number" />
                <input name="InsuranceDetails.GroupPolicyNumber" value={formData.InsuranceDetails.GroupPolicyNumber} onChange={handleInputChange} placeholder="Group Policy Number" />
                <input type="date" name="InsuranceDetails.EffectiveDate" value={formData.InsuranceDetails.EffectiveDate} onChange={handleInputChange} placeholder="Effective Date" />
                <input type="date" name="InsuranceDetails.ExpirationDate" value={formData.InsuranceDetails.ExpirationDate} onChange={handleInputChange} placeholder="Expiration Date" />
                <textarea name="MedicalHistory" value={formData.MedicalHistory} onChange={handleInputChange} placeholder="Medical History"></textarea>
                <input name="Allergies" value={formData.Allergies.join(', ')} onChange={(event) => setFormData({...formData, Allergies: event.target.value.split(',').map(item => item.trim())})} placeholder="Allergies (comma-separated)" />
                <button type="submit">Submit</button>
            </form>
        </div>
);
}