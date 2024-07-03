var express = require("express");
const User = require("../model/db");
const DeletedUser = require("../model/DeletedAccount");
var router = express.Router();

//follow astrologer
router.post("/follow", async (req, res) => {
  console.log(req.body);

  try {
    const { userId, astroId } = req.body;

    //console.log(req.body);
    try {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { following: [astroId] },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        astroId,
        {
          $addToSet: { followers: [userId] },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "Successfully followed" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Something went wrong" });
  }
});

//unfollow astrologer

router.post("/unfollow", async (req, res) => {
  console.log(req.body);

  try {
    const { userId, astroId } = req.body;

    console.log(userId, astroId);
    try {
      await User.findByIdAndUpdate(
        userId,
        {
          $pullAll: { following: [astroId] },
        },
        { new: true }
      );

      await User.findByIdAndUpdate(
        astroId,
        {
          $pullAll: { followers: [userId] },
        },
        { new: true }
      );
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "Successfully Unfollowed" });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Something went wrong" });
  }
});

router.get("/following/:id", async (req, res) => {
  //console.log("first")

  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const followers = user.following;
    const list = await Promise.all(
      followers.map((id) => {
        return User.findById(id);
      })
    );

    console.log(list);

    // Return the list of followers
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/updateUserDetail/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const { name, placeOfBirth, time, selectedDate } = req.body;
    console.log(userId, req.body);
    if (!name || !placeOfBirth || !time || !selectedDate) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "userDetail.name": name,
          "userDetail.placeOfBirth": placeOfBirth,
          "userDetail.timeOfBirth": time,
          "userDetail.dob": selectedDate,
          "userDetail.lat": "28.7",
          "userDetail.long": "77.0",
          "userDetail.tz": "5.5",
        },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Call request Sent detail

router.post("/calling-request", async (req, res) => {
  const { currentId, selectedUserId } = req.body;
  console.log(currentId, selectedUserId);
  try {
    //update the the receipent's request array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { callRequestRecieved: currentId },
    });
    //update sender's sent request array
    await User.findByIdAndUpdate(currentId, {
      $push: { callRequestSent: selectedUserId },
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Call request Recieved detail

router.get("/callList/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    //fetch the user document based on userId
    const user = await User.findById(userId)
      .populate("callRequestRecieved", "name")
      .lean();

    console.log(user);
    const chatRequest = user.callRequestRecieved;

    res.json(chatRequest);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Call request accept

router.post("/callRequest/accept", async (req, res) => {
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
    sender.callFriends.push(recipientId);
    recipient.callFriends.push(senderId);

    // Remove the friend request entries
    // recipient.recievedRequest = recipient.recievedRequest.filter(
    //   (request) => request.toString() !== senderId.toString()
    // );

    // sender.sentRequest = sender.sentRequest.filter(
    //   (request) => request.toString() !== recipientId.toString()
    // );

    if (recipient.callRequestRecieved) {
      recipient.callRequestRecieved = recipient.callRequestRecieved.filter(
        (request) => request && request.toString() !== senderId.toString()
      );
    }

    if (sender.callRequestSent) {
      sender.callRequestSent = sender.callRequestSent.filter(
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

// Accepted call request

router.get("/acceptedCallList/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate("callFriends", "name");

    const acceptedCalls = user.callFriends;
    res.json(acceptedCalls);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal Server Error" });
  }
});

// Delete User account

router.get("/deleteAccount/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("userid", userId);

    // Step 1: Find the user by ID and select the name and email
    const user = await User.findById(userId).select("name email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Upsert the user data to DeletedUser collection
    await DeletedUser.findOneAndUpdate(
      { email: user.email }, // Search criteria: match the user by email
      {
        // Update fields or create if not existing
        name: user.name,
        email: user.email,
        deletedAt: new Date(),
      },
      { upsert: true, new: true } // Options: upsert = true to create if not exist, new = true to return the updated document
    );

    // Step 3: Delete the user from the User collection
    await User.findByIdAndDelete(userId);

    // Respond with success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
