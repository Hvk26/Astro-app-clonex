const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/getNumberData", (req, res) => {
  fs.readFile("../api/public/data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    try {
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      return res.status(200).json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

module.exports = router;
