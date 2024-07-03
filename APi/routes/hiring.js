const express = require("express");
const router = express.Router();
const User = require("../model/db");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const hashPassword = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10); // You can adjust the salt rounds as needed
    console.log("Generated Salt:", salt);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error; // Handle the error as needed (e.g., log it or return an error response)
  }
};

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport
  const transporter = nodemailer.createTransport({
    //configure email service
    service: "gmail",
    auth: {
      user: "swapnilbhushan2010@gmail.com",
      pass: "sbcctpzqoijaiiwu",
    },
  });

  //compose the email message
  const mailOptions = {
    from: "Astrotalk.com",
    to: email,
    subject: "Email Verification",
    text: `Please Cick the following link to verify your email : http://localhost:2020/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("error sending email", err);
  }
};

router.post("/astrologer-register", async (req, res) => {
  console.log(req.body);
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      maritalStatus,
      city,
      state,
      country,
      pincode,
      skills,
      languages,
      yearsOfExperience,
      hoursContribution,
      hearAbout,
      isWorking,
      platformName,
      whyOnboard,
      incomeSource,
      qualification,
      astrologyLearning,
      earningExpectation,
      bio,
      role,
    } = req.body;

    // Check if user with the same email exists
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
      return res.status(400).json({ error: "Email address already in use" });
    }

    const existingPhoneUser = await User.findOne({ phoneNumber });
    if (existingPhoneUser) {
      return res.status(400).json({ error: "Phone number already in use" });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    // Hash the user's password
    const hashedPassword = await hashPassword(password);

    // Create new user if email is not in use
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      bio,
      city,
      state,
      country,
      pincode,
      gender,
      maritalStatus,
      skills,
      languages,
      yearsOfExperience,
      hoursContribution,
      hearAbout,
      isWorking,
      platformName,
      whyOnboard,
      incomeSource,
      qualification,
      astrologyLearning,
      earningExpectation,
      role,
    });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    const savedUser = await newUser.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res
      .status(200)
      .json({ message: "User registered successfully", astrologer: savedUser });
  } catch (error) {
    console.error("Error:", error);

    // Send meaningful error response
    res.status(500).json({ error: error.message });
  }
});

router.get("/userbyEmail/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "Correct email" });
    }
    res.status(401).send("user exists " + email);
  } catch (err) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

router.get("/userbyPhone/:phoneNumber", async (req, res) => {
  try {
    const phoneNumber = req.params.phoneNumber.trim();
    console.log(phoneNumber);
    const user = await User.findOne({ phoneNumber });
    console.log(user);
    if (!user) {
      return res.status(200).json({ message: "Phone Number Is Usable" });
    }
    res.status(401).send("user exists " + phoneNumber);
  } catch (err) {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
