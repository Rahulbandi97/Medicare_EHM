const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const healthcareProviderSchema = new Schema({
  ProviderID: {
    type: String,
    required: true,
    unique: true
  },
  FirstName: {
    type: String,
    required: true
  },
  MiddleName: String,
  LastName: {
    type: String,
    required: true
  },
  Designation: {
    type: String,
    required: true
  },
  Specialization: {
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
  Address: {
    Street: String,
    City: String,
    State: String,
    PostalCode: {
      type: String,
      validate: {
        validator: function(v) {
          return /\d{5,10}/.test(v);
        },
        message: props => `${props.value} is not a valid postal code!`
      },
    },
    Country: String
  }
}, { timestamps: true });

module.exports = mongoose.model("HealthCareProvider", healthcareProviderSchema);
