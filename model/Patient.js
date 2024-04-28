const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  PatientID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    unique: true
  },
  FirstName: {
    type: String,
    required: true
  },
  MiddleName: {
    type: String
  },
  LastName: {
    type: String,
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  Age: {
    type: Number,
    required: true,
    min: 0,
    max: 130
  },
  GenderAssignedAtBirth: {
    type: String,
    required: true,
    enum: ['Male', 'Female']
  },
  PreferredGender: {
    type: String,
    required: true
  },
  ContactNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /\d{10}/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  EmailAddress: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  EmergencyContact: {
    Name: String,
    Relationship: String,
    ContactInformation: String
  },
  InsuranceDetails: {
    InsuranceProvider: String,
    PolicyNumber: String,
    GroupPolicyNumber: String,
    EffectiveDate: {
      type: Date,
      default: Date.now
    },
    ExpirationDate: Date
  },
  MedicalHistory: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'EMR'
  },
  Allergies: [String]
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);
