const express = require("express");
const router = express.Router();
const User = require("../model/db");
const RequestUpdate = require("../model/RequestUpdation");
// end points to update amount and waitTime of astrologer

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { amount, waitTime } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          amount,
          waitTime,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

//online Chat status

router.put("/onlineChat/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body.chatStatus);
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          chatOnline: req.body.chatStatus,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

//online Call status

router.put("/onlineCall/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body.callStatus);
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          callOnline: req.body.callStatus,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Online Video Call Status
router.put("/onlineVideocall/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body.videoStatus);
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          videoCallOnline: req.body.videoStatus,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});
// Live Status
router.put("/isLive/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id, req.body.isLive);
  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          isLive: req.body.isLive,
        },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});
// Price Change Request

router.post("/request-pricechange/:id", async (req, res) => {
  const userId = req.params.id;
  const { amount } = req.body;

  try {
    // Step 1: Find the request in the RequestUpdate collection by userId
    let updateRequest = await RequestUpdate.findOne({ userId });

    if (updateRequest) {
      // If an update request exists, update the phone number
      updateRequest.priceChange = amount;
      updateRequest.priceChangeApproved = false;
    } else {
      // If no update request exists, create a new one
      updateRequest = new RequestUpdate({
        userId,
        priceChange: amount,
        priceChangeApproved: false,
        // Include other fields as necessary, e.g., initial requested date
        requestedAt: new Date(), // Adding requestedAt field if necessary
      });
    }

    // Step 3: Save the updated or new request
    await updateRequest.save();

    return res.status(200).json({
      message: "Price change request sent successfully",
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Phone Number Updation Request
router.post("/request-phonenumber/:id", async (req, res) => {
  const userId = req.params.id;
  const { phoneNumber } = req.body;

  try {
    // Step 1: Check if the phone number exists in the User collection and belongs to a different user
    const existingUser = await User.findOne({ phoneNumber });

    if (existingUser && existingUser._id.toString() !== userId) {
      // If the phone number already exists for another user, return an error
      return res.status(400).json({ error: "Phone number already exists" });
    }

    // Step 2: Find the request in the RequestUpdate collection by userId
    let updateRequest = await RequestUpdate.findOne({ userId });

    if (updateRequest) {
      // If an update request exists, update the phone number
      updateRequest.phoneNumber = phoneNumber;
      updateRequest.phoneApproved = false;
    } else {
      // If no update request exists, create a new one
      updateRequest = new RequestUpdate({
        userId,
        phoneNumber,
        phoneApproved: false,
        // Include other fields as necessary, e.g., initial requested date
        requestedAt: new Date(), // Adding requestedAt field if necessary
      });
    }

    // Step 3: Save the updated or new request
    await updateRequest.save();

    return res.status(200).json({
      message: "Phone number update request sent successfully",
    });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

// Bank details updation request

router.post("/bank-request/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    console.log("Astrologer: " + userId);

    const { accountHolderName, bankName, accountNumber, ifscCode } = req.body;

    // Check if the required fields are provided
    if (!accountHolderName || !bankName || !accountNumber || !ifscCode) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // const existingAstrologer = await User.findById({ _id: userId });

    // if (!existingAstrologer) {
    //   return res.status(404).json({ error: "Astrologer not found" });
    // }
    // Find the existing request for the user or create a new one
    let updateRequest = await RequestUpdate.findOne({ userId });

    if (updateRequest) {
      // Update existing request with new bank details
      updateRequest.userBankDetail = {
        accountHolderName,
        bankName,
        accountNumber,
        ifscCode,
      };
      updateRequest.userBankDetailApproved = false;
    } else {
      // Create a new request with the provided details
      updateRequest = new RequestUpdate({
        userId,
        userBankDetail: {
          accountHolderName,
          bankName,
          accountNumber,
          ifscCode,
        },
        userBankDetailApproved: false,
      });
    }

    await updateRequest.save();

    res.status(200).json({
      message: "Bank details updation sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Display All Update Request

router.get("/updation-request", async (req, res) => {
  const usersData = await RequestUpdate.find().populate("userId", "name email");

  const filtered = usersData.filter((user) => {
    if (
      user._doc.priceChangeApproved &&
      user._doc.phoneApproved &&
      user._doc.userBankDetailApproved
    )
      return false;
    return true;
  });
  console.log(">>>>>>>>>>>>>>", filtered);
  res.status(200).json(filtered);
});

// Display Particular Update Request
router.get("/request-detail/:id", async (req, res) => {
  try {
    const requestId = req.params.id;
    const request = await RequestUpdate.findById(requestId);

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    const data = request._doc ?? request;
    if (data.priceChangeApproved) {
      delete data.priceChange;
      delete data.priceChangeApproved;
    }
    if (data.userBankDetailApproved) {
      delete data.userBankDetail;
      delete data.userBankDetailApproved;
    }
    if (data.phoneApproved) {
      delete data.phoneNumber;
      delete data.phoneApproved;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Phone Number Updation

router.put("/phonenumber/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { phoneNumber } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          phoneNumber: req.body.phoneNumber,
        },
      },
      { new: true }
    );

    await RequestUpdate.findOneAndUpdate(
      { userId },
      {
        $set: {
          phoneApproved: true,
          phoneNumber: undefined,
        },
      }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Phone Number successfully updated" });
  } catch (error) {
    console.log(error);
  }
});

// Price Update

router.put("/priceChange/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { amount } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          chatRate: amount,
        },
      },
      { new: true }
    );
    await RequestUpdate.findOneAndUpdate(
      { userId },
      {
        $set: {
          priceChangeApproved: true,
          priceChange: undefined,
        },
      }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "Price change successful" });
  } catch (error) {
    console.log(error);
  }
});

// Bank detail Updation

router.put("/bankDetail/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { accountHolderName, bankName, accountNumber, ifscCode } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          "userBankDetail.accountHolderName": accountHolderName,
          "userBankDetail.bankName": bankName,
          "userBankDetail.accountNumber": accountNumber,
          "userBankDetail.ifscCode": ifscCode,
        },
      },
      { new: true }
    );
    await RequestUpdate.findOneAndUpdate(
      { userId },
      {
        $set: {
          userBankDetail: undefined,
          userBankDetailApproved: true,
        },
      }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Bank details successfully updated" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
