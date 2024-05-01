const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
  StaffID: {
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
  Role: {
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
  Designation: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Staff", staffSchema);
