const mongoose = require('mongoose');

const reportSchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  reportId: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  issue: {
    type: String,
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  solution: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

const Reports = mongoose.model('Reports', reportSchema);

module.exports = Reports;
