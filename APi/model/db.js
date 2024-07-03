const mongoose = require("mongoose");

const userDetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dob: { type: String, required: true },
  placeOfBirth: { type: String, required: true },
  timeOfBirth: { type: String, required: true },
  lat: { type: String, default: "28.7" },
  long: { type: String, default: "77.0" },
  tz: { type: String, default: "5.5" },
});

const userBankDetail = new mongoose.Schema({
  accountHolderName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
  bankName: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  dateOfBirth: { type: String }, // New field for date of birth
  role: {
    type: String,
    enum: ["user", "pending", "verified", "rejected", "disabled"],
    required: true,
  },
  bio: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  pincode: String,
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  maritalStatus: String,
  skills: [{ type: String }],
  allSkills: [{ type: String }],
  languages: [{ type: String }],
  yearsOfExperience: { type: Number },
  hoursContribution: String,
  hearAbout: String,
  isWorking: { type: String, enum: ["Yes", "No"] },
  platformName: String,
  whyOnboard: String,
  incomeSource: String,
  qualification: String,
  astrologyLearning: String,
  isRefer: { type: String, enum: ["Yes", "No"] },
  earningExpectation: String,
  image: { type: String },
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  recievedRequest: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  // Astrologer-specific attribute
  chatOnline: { type: Boolean },
  callOnline: { type: Boolean },
  videoCallOnline: { type: Boolean },
  isLive: {type: Boolean},
  
  chatRate: { type: Number },
  audioRate: { type: Number },
  videoRate: { type: Number },
  waitTime: { type: Number },
  verificationToken: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  //user-specific
  userDetail: {
    type: userDetailSchema,
  },
  userBankDetail: {
    type: userBankDetail,
  },
  // Call-request
  callRequestSent: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  callRequestRecieved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  callFriends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
