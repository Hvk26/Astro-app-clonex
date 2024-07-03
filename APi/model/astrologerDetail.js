const mongoose = require('mongoose');

const astrologerDetails = new mongoose.Schema({
  gender: {type: String, enum: ['male', 'female', 'other'], required: true},
  phoneNumber: {type: String, required: true},
  dateOfBirth: {type: Date, required: true}, // New field for date of birth
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'other'],
    required: true,
  },
  bio: {type: String},
  city: {type: String},
  country: {type: String},
  pincode: {type: String},
  image: {type: String},
  primarySkills: [{type: String}], // Astrologer-specific attribute
  allSkills: [{type: String}], // Astrologer-specific attribute
  languages: [{type: String}], // Astrologer-specific attribute
  yearsOfExperience: {type: Number}, // Astrologer-specific attribute
  dailyContributedHours: {type: String},
  verificationToken: String,
  hearAboutApp: {type: String},
  workingOnAnyOtherPlatform: {
    type: String,
    enum: ['yes', 'no'],
    required: true,
  },
  nameOfOtherPlatform: [{type: String}],
  whyWeOnboardYou: {type: String},
  sourceOfIncome: [{type: String}],
  highestQualification: {type: String},
  learningOfAstrology: {type: String},
  instaLink: {type: String},
  instaLink: {type: String},
  instaLink: {type: String},
  instaLink: {type: String},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AstrologerDetails = mongoose.model(
  'AstrologerDetails',
  astrologerDetails,
);

module.exports = AstrologerDetails;
