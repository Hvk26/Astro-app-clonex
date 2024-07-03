const mongoose = require("mongoose");

const userBankDetail = new mongoose.Schema({
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankName: { type: String, required: true },
});

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phoneNumber: { type: String },
  priceChange: {
    type: String,
  },
  userBankDetail: {
    type: userBankDetail,
  },
  phoneApproved: { type: Boolean, default: false },
  userBankDetailApproved: { type: Boolean, default: false },
  priceChangeApproved: { type: Boolean, default: false },
  requestedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const RequestUpdate = mongoose.model("RequestUpdate", requestSchema);

module.exports = RequestUpdate;
