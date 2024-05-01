import React, { useState } from 'react';
import './css/EMRForm.css';
import axios from 'axios';

export default function EMRForm() {
  const [formData, setFormData] = useState({
    RecordID:'',
    PatientID: '',
    ProviderID: '',
    StaffID: '',
    VitalSigns: {
      HeartRate: '',
      BloodPressure: '',
      BodyTemperature: '',
      OxygenSaturation: ''
    },
    MedicalNotes: '',
    Diagnoses: [],
    Treatments: [],
    Medications: [],
    ImmunizationDates: [],
    RadiologyImages: [],
    LabTestResults: []
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
    } else if (name === "Diagnoses" || name === "Treatments" || name === "Medications" || name === "RadiologyImages" || name === "LabTestResults") {
      setFormData({
        ...formData,
        [name]: value.split(',')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleDateChange = (name, value) => {
    setFormData({
      ...formData,
      ImmunizationDates: {
        ...formData.ImmunizationDates,
        [name]: new Date(value)
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      const response = await axios.post('http://localhost:5000/emr', formData, {
          headers: {
              'Content-Type': 'application/json'
          }
      });
      console.log('Submission successful', response.data);
      alert('EMR Record created successfully!');
    } catch (error) {
      console.error('Submission failed', error);
      // Handle errors
    }
  };

  return (
    <div className='container'>
        {/* <h1>EMR Details</h1> */}
        <form onSubmit={handleSubmit}>
        <h1 className='title'>EMR Details</h1>
        <input name="RecordID" value={formData.RecordID} onChange={handleInputChange} placeholder="Record ID" required />  
      <input name="PatientID" value={formData.PatientID} onChange={handleInputChange} placeholder="Patient ID" required />
      <input name="ProviderID" value={formData.ProviderID} onChange={handleInputChange} placeholder="Provider ID" required />
      <input name="StaffID" value={formData.StaffID} onChange={handleInputChange} placeholder="Staff ID" required />
      {/* Vital Signs Inputs */}
      <input name="VitalSigns.HeartRate" value={formData.VitalSigns.HeartRate} onChange={handleInputChange} placeholder="Heart Rate" />
      <input name="VitalSigns.BloodPressure" value={formData.VitalSigns.BloodPressure} onChange={handleInputChange} placeholder="Blood Pressure" />
      <input name="VitalSigns.BodyTemperature" value={formData.VitalSigns.BodyTemperature} onChange={handleInputChange} placeholder="Body Temperature" />
      <input name="VitalSigns.OxygenSaturation" value={formData.VitalSigns.OxygenSaturation} onChange={handleInputChange} placeholder="Oxygen Saturation" />
      <textarea name="MedicalNotes" value={formData.MedicalNotes} onChange={handleInputChange} placeholder="Medical Notes" />
      <input name="Diagnoses" value={formData.Diagnoses.join(', ')} onChange={handleInputChange} placeholder="Diagnoses (comma-separated)" />
      <input name="Treatments" value={formData.Treatments.join(', ')} onChange={handleInputChange} placeholder="Treatments (comma-separated)" />
      <input name="Medications" value={formData.Medications.join(', ')} onChange={handleInputChange} placeholder="Medications (comma-separated)" />
      {/* Array of Dates for Immunizations */}
      {formData.ImmunizationDates.map((date, index) => (
        <input key={index} type="date" onChange={(e) => handleDateChange(`ImmunizationDates[${index}]`, e.target.value)} value={date.toISOString().slice(0, 10)} />
      ))}
      <input name="RadiologyImages" value={formData.RadiologyImages.join(', ')} onChange={handleInputChange} placeholder="Radiology Images (comma-separated)" />
      <input name="LabTestResults" value={formData.LabTestResults.join(', ')} onChange={handleInputChange} placeholder="Lab Test Results (comma-separated)" />
      <button type="submit">Submit</button>
        </form>
    </div>
  );
}