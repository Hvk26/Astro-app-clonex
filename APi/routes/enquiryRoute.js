const express = require("express");
const router = express.Router();
const Enquiry = require("../model/Enquiry");

router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).send(enquiry);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
