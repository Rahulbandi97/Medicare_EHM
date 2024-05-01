// StaffForm.js

import React, { useState } from 'react';
import './css/StaffForm.css'; // Adjust the path as needed based on your project structure


const StaffForm = () => {
  const [staffId, setStaffID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [designation, setDesignation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the staff details
    const staffData = {
      StaffID: staffId,
      FirstName: firstName,
      MiddleName: middleName,
      LastName: lastName,
      Role: role,
      ContactNumber: contactNumber,
      EmailAddress: emailAddress,
      Designation: designation
    };

    // Send the data to the server (you'll need to implement this part)
    try {
      const response = await fetch('http://localhost:3001/createStaff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffData),
      });

      if (response.ok) {
        console.log('Staff data successfully sent to the server.');
        // Handle success (e.g., show a success message)
      } else {
        console.error('Error sending staff data to the server.');
        // Handle error (e.g., show an error message)
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container">
      {/* <h2>Staff Details Form</h2> */}
      <form onSubmit={handleSubmit}>
      <h2>Staff Details Form</h2>
        <label>
          Staff ID:
          <input
            type="text"
            value={staffId}
            onChange={(e) => setStaffID(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Middle Name:
          <input
            type="text"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Role:
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Contact Number:
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Email Address:
          <input
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Designation:
          <input
            type="email"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Staff</button>
      </form>
    </div>
  );
};

export default StaffForm;
