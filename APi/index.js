const express = require("express");
const https = require("https");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
var logger = require("morgan");
const multer = require("multer");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const options = {
  key: fs.readFileSync("./certificates/private.key"), // Path to your private key file
  cert: fs.readFileSync("./certificates/certificate.crt"), // Path to your SSL certificate file
};
const server = https.createServer(options, app);

const passport = require("passport"); //authentication middleware
const LocalStrategy = require("passport-local").LocalStrategy;
const jwt = require("jsonwebtoken");
const cors = require("cors");
const walletRouter = require("./routes/wallet");
const transactionRouter = require("./routes/transaction");
const userRouter = require("./routes/user");
const grievanceRouter = require("./routes/reports");
const astrologerRouter = require("./routes/astrologerRoutes");
const dataRoute = require("./routes/dataRoute");
const hiringRoute = require("./routes/hiring");
const enquiryRoute = require("./routes/enquiryRoute");
var router = express.Router();

const httpsPORT = process.env.HTTPS_PORT;
const httpPORT = process.env.HTTP_PORT;
//middleware
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.static("uploads"));
app.use("/wallet", walletRouter);
app.use("/transaction", transactionRouter);
app.use("/user", userRouter);
app.use("/grievance", grievanceRouter);
app.use("/astrologer", astrologerRouter);
app.use("/data", dataRoute);
app.use("/hire", hiringRoute);
app.use("/enquiry", enquiryRoute);
const filePath = path.resolve(__dirname, "../public/data.json");

server.listen(httpsPORT, () => {
  console.log(`Server runnig at ${httpsPORT}`);
});

app.listen(httpPORT, () => {
  console.log(`Server runnig at ${httpPORT}`);
});

mongoose
  .connect(`${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });
const User = require("./model/db");
const Message = require("./model/message");
const { request } = require("http");
const Admin = require("./model/Admin");
const Wallet = require("./model/Wallet");
//function to send verification email to user

const sendVerificationEmail = async (email, verificationToken) => {
  //create a nodemailer transport
  const transporter = nodemailer.createTransport({
    //configure email service
    service: "gmail",
    auth: {
      user: process.env.VERIFICATION_EMAIL,
      pass: process.env.VERIFICATION_PASSWORD,
    },
  });

  //compose the email message
  const mailOptions = {
    from: "Astrogini.net",
    to: email,
    subject: "Email Verification",
    text: `Please Cick the following link to verify your email : https://89.116.34.9/verify/${verificationToken}`,
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("error sending email", err);
  }
};

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

//registraion api
app.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      dateOfBirth,
      role,
      // skills,
      // languages,
      // yearsOfExperience,
    } = req.body;

    // Check if user with the same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email already registered" }); // Update the error message
    }
    const existingPhoneUser = await User.findOne({ phoneNumber });
    if (existingPhoneUser) {
      return res.status(400).json({ error: "Phone number already registered" });
    }
    if (!password) {
      return res.status(401).json({ error: "Password is required" });
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
      role,
      // skills,
      // languages,
      // yearsOfExperience,
    });

    newUser.verificationToken = crypto.randomBytes(20).toString("hex");
    const savedUser = await newUser.save();
    const newWallet = new Wallet({
      userId: savedUser._id,
      balance: 0,
      transactions: [],
    });
    await newWallet.save();
    sendVerificationEmail(newUser.email, newUser.verificationToken);
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error:", error);

    // Send meaningful error response
    res.status(500).json({ error: error.message });
  }
});

//endpoints for registration of the user

// app.post('/register', async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       password,
//       phoneNumber,
//       dateOfBirth,
//       role,
//       skills,
//       languages,
//       yearsOfExperience,
//     } = req.body;
//     // Check if user with the same email exists
//     const existingUser = await User.findOne({email});
//     if (existingUser) {
//       return res.status(400).json({error: 'Email address already in use'});
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     // Create new user if email is not in use
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       phoneNumber,
//       dateOfBirth,
//       role,
//       skills,
//       languages,
//       yearsOfExperience,
//     });

//     newUser.verificationToken = crypto.randomBytes(20).toString('hex');
//     const savedUser = await newUser.save();
//     sendVerificationEmail(newUser.email, newUser.verificationToken);
//     res
//       .status(201)
//       .json({message: 'User registered successfully', user: savedUser});
//   } catch (error) {
//     console.error('Error:', error);

//     // Send meaningful error response
//     res.status(500).json({error: error.message});
//   }
// });

//function to create token based on userID

const createToken = (userId) => {
  // Set token payload
  const payload = {
    userId: userId,
  };
  // Generate the token with secret key and expiration time
  const token = jwt.sign(payload, secretKey); // Pass the secretKey as the second argument
  return token;
};

//endpoint for logging in of user
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, secretKey);
    // Send the userId along with the token in the response
    res.status(200).json({
      token,
      userId: user._id,
      role: user.role,
    });

    console.log(res.json);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// app.post('/login', async (req, res) => {
//   try {
//     const {email, password} = req.body;
//     const user = await User.findOne({email});

//     if (!user) {
//       return res.status(401).json({message: 'Invalid username or password'});
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       return res.status(401).json({message: 'Invalid password'});
//     }

//     const token = jwt.sign({userId: user._id}, secretKey); // Replace with your secret key
//     res.status(200).json({token, userId: user._id, role: user.role});
//   } catch (err) {
//     res.status(500).json({message: 'Login failed'});
//   }
// });

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //mark the user as verified

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Email Verified Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Email Verification Failed" });
  }
});

/**
 *
 *  function to generate secret key
 */
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};
const secretKey = generateSecretKey();

//endpoint to access users having role as a client

// Route to get astrologer users
app.get("/astrologers", async (req, res) => {
  try {
    // Find users with role "astrologer"
    const astrologerUsers = await User.find({ role: "verified" });

    res.status(200).json(astrologerUsers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route to get client Users

app.get("/client", async (req, res) => {
  try {
    // Find users with role "astrologer"
    const clientUsers = await User.find({ role: "user" });

    res.status(200).json(clientUsers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//endpoints to send request

app.post("/request", async (req, res) => {
  const { currentId, selectedUserId } = req.body;
  console.log(currentId, selectedUserId);
  try {
    //update the the receipent's request array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { recievedRequest: currentId },
    });
    //update sender's sent request array
    await User.findByIdAndUpdate(currentId, {
      $push: { sentRequest: selectedUserId },
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//endpoint for chatList of particular user

app.get("/chatList/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    //fetch the user document based on userId
    const user = await User.findById(userId)
      .populate("recievedRequest", "name")
      .lean();

    console.log(user);
    const chatRequest = user.recievedRequest;

    res.json(chatRequest);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//endpoints to accept the request of a partcular person

app.post("/chatRequest/accept", async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;

    // Retrieve the documents of sender and recipient
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    // Check if sender and recipient exist
    if (!sender || !recipient) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the friends array for both sender and recipient
    sender.friends.push(recipientId);
    recipient.friends.push(senderId);

    // Remove the friend request entries
    // recipient.recievedRequest = recipient.recievedRequest.filter(
    //   (request) => request.toString() !== senderId.toString()
    // );

    // sender.sentRequest = sender.sentRequest.filter(
    //   (request) => request.toString() !== recipientId.toString()
    // );

    if (recipient.recievedRequest) {
      recipient.recievedRequest = recipient.recievedRequest.filter(
        (request) => request && request.toString() !== senderId.toString()
      );
    }

    if (sender.sentRequest) {
      sender.sentRequest = sender.sentRequest.filter(
        (request) => request && request.toString() !== recipientId.toString()
      );
    }

    // Save the changes to the database
    await sender.save();
    await recipient.save();

    res.status(200).json({ message: "Friend request accepted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//endpoints to access all the friends of the loggedin users

app.get("/acceptedChatList/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("friends", "name");

    const acceptedChat = user.friends;
    res.json(acceptedChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
});

//endpoint to post msgs and store in backend

app.post("/messages", async (req, res) => {
  try {
    const { senderId, recipientId, messageType, messageText } = req.body;

    const newMessage = new Message({
      senderId,
      recipientId,
      messageType,
      message: messageText,
      timeStamp: new Date(),
    });

    await newMessage.save();
    res.status(200).json({ message: "Message Sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//endpoint to get userDetails for chat room header

app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch the user data from the database using User.findById
    const recipientId = await User.findById(userId);
    if (!recipientId) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(recipientId);
  } catch (error) {
    console.error("Error in fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//endpoint to fetch the msgs between two users in chatroom

app.get("/messages/:senderId/:recipientId", async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: senderId, recipientId: recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//end point to delete the msgs

app.post("/deleteMessages", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "Invalid req body" });
    }

    await Message.deleteMany({ _id: { $in: messages } });
    res.json({ message: "messages deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

//endpoint for userinformation

app.get("/userInfo/:userId", async (req, res) => {
  console.log("getting info");
  try {
    const userId = req.params.userId; // Access the userId parameter
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User Info", user);
    res.json(user);
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Destination directory for uploaded files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9); // Unique filename suffix
//     cb(null, uniqueSuffix + path.extname(file.originalname)); // Use original filename with a unique suffix
//   },
// });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg");
  },
});

var upload = multer({ storage: storage });
//endpoint to update user details

app.put("/edit-userInfo/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, phoneNumber, bio, country, city } = req.body;
  // console.log(req.body);
  try {
    // Find the user by userId
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          name,
          phoneNumber,
          bio,
          country,
          city,
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user); // Respond with the updated user data
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

app.put(
  "/edit-userInfo/image/:userId",
  upload.single("image"),
  async (req, res) => {
    console.log("called");
    const { userId } = req.params;
    const imagePath = req.file.filename;

    console.log(imagePath);
    try {
      // Save the imagePath to the user's document in the database
      const user = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { image: imagePath } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.log("Error in uploading image", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);
//////////////////////////////// Astro hire app /////////////////
//login in astrologer hire app

app.post("/astro-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    // Send the userId along with the token in the response
    res.status(200).json({ token, userId: user._id, role: user.role });

    console.log(res.json);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// registration of Astrologer In Astro Hire App

app.post("/astrologer-register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user with the same email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email address already in use" });
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

//astrogogers hiring registration

app.post("/astrologer/:userId", async (req, res) => {
  const { userId } = req.params;
  const {
    name,
    email,
    password,
    dateOfBirth,
    phoneNumber,
    gender,
    maritalStatus,
    newSkill,
    newAllSkill,
    newLanguage,
    city,
    state,
    country,
    pincode,
    yearsOfExperience,
    hoursContribution,
    hearAbout,
    isWorking,
    platformName,
    whyOnboard,
    incomeSource,
    qualification,
    astrologyLearning,
    isRefer,
    earningExpectation,
    bio,
  } = req.body;
  console.log(req.body);
  const hashedPassword = await hashPassword(password);
  try {
    // Find the user by userId
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
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
          skills: newSkill,
          allSkills: newAllSkill,
          languages: newLanguage,
          yearsOfExperience,
          hoursContribution,
          hearAbout,
          isWorking,
          platformName,
          whyOnboard,
          incomeSource,
          qualification,
          astrologyLearning,
          isRefer,
          earningExpectation,
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user); // Respond with the updated user data
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

////////////////////////////////    Admin App   ///////////////////////////////////////
///admin login

app.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    // Send the userId along with the token in the response
    res.status(200).json({ token, userId: user._id, role: user.role });

    console.log(res.json);
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

//to get aal the user details

app.get("/user-details", async (req, res) => {
  try {
    // Find users with role "astrologer"
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// astrologer approval status

app.put("/astrologer-approval/:userId", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;
  console.log(">>>>>>>>>>>>>>>>>>aaproval", req.body);
  try {
    // Find the user by userId
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          role,
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user); // Respond with the updated user data
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Search endpoint
// app.get('/search', async (req, res) => {
//   const {name} = req.query;
//   if (!name) {
//     return res.status(400).json({error: 'Name parameter is required'});
//   }

//   try {

//     const results = await User.find({name: {$regex: new RegExp(name, 'i')}});
//     res.json(results);
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// });

// app.get('/search', async (req, res) => {
//   const {name, skills, languages, yearsOfExperience} = req.query;

//   const skillArray = skills ? skills.split(',') : [];
//   const languageArray = languages ? languages.split(',') : [];
//   const experienceArray = yearsOfExperience ? yearsOfExperience.split(',') : [];

//   try {
//     const results = await User.find({
//       ...(name && {name: {$regex: new RegExp(name, 'i')}}),
//       ...(skillArray.length > 0 ? {skills: {$in: skillArray}} : {}),
//       ...(languageArray.length > 0 ? {languages: {$in: languageArray}} : {}),
//       ...(experienceArray.length > 0
//         ? {
//             yearsOfExperience: {
//               $gt: parseInt(experienceArray[0]),
//               $lt: parseInt(experienceArray[1]),
//             },
//           }
//         : {}),
//     });

//     res.json(results);
//   } catch (error) {
//     console.error('Error fetching search results:', error);
//     res.status(500).json({error: 'Internal Server Error'});
//   }
// });
app.get("/search", async (req, res) => {
  let { name, skills, languages, yearsOfExperience } = req.query;

  // Check if 'name' is undefined and update it accordingly
  name = name === "undefined" ? undefined : name;

  const skillArray = skills ? skills.split(",") : [];
  const languageArray = languages ? languages.split(",") : [];
  const experienceArray = yearsOfExperience ? yearsOfExperience.split(",") : [];

  try {
    const query = {
      ...(name && { name: { $regex: new RegExp(name, "i") } }),
      ...(skillArray.length > 0 ? { skills: { $in: skillArray } } : {}),
      ...(languageArray.length > 0
        ? { languages: { $in: languageArray } }
        : {}),
      ...(experienceArray.length > 0
        ? {
            yearsOfExperience: {
              $gt: parseInt(experienceArray[0]),
              $lt: parseInt(experienceArray[1]),
            },
          }
        : {}),
    };

    const results = await User.find(query);

    res.json(results);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Test

app.get("/test-service", (req, res) => {
  res.send("Welcome to Astrogini");
});
