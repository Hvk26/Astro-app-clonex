const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
});

const Enquiry = mongoose.model("Enquiry", enquirySchema);

module.exports = Enquiry;
