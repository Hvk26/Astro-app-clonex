const mongoose = require("mongoose");

const deletedUser = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  deletedAt: { type: Date, default: Date.now },
});

const DeletedUser = mongoose.model("DeletedUser", deletedUser);

module.exports = DeletedUser;
