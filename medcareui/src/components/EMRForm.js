import React, { useState } from 'react';
import './css/EMRForm.css';
import axios from 'axios';

function EMRForm() {
  const [formData, setFormData] = useState({
    RecordID: '',
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
    } else if (["Diagnoses", "Treatments", "Medications", "RadiologyImages", "LabTestResults"].includes(name)) {
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

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        setFormData({
          ...formData,
          RadiologyImages: [...formData.RadiologyImages, base64String]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/emr', formData,  {
        headers: {
            'Content-Type': 'application/json'
        }
      });
      console.log('Submission successful', response.data);
      alert('EMR Record created successfully!');
      setFormData({
        RecordID: '',
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
    

      // Optionally reset the form here
    } catch (error) {
      console.error('Submission failed', error);
      alert('Failed to create EMR record!');
    }
  };

  return (
    <div className='container'>
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
        {/* Upload Radiology Images */}
        <label htmlFor="RadiologyImages">Upload Radiology Image:</label>
        <input type="file" name="RadiologyImages" onChange={handleImageChange} accept="image/*" />
        <input name="LabTestResults" value={formData.LabTestResults.join(', ')} onChange={handleInputChange} placeholder="Lab Test Results (comma-separated)" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EMRForm;
