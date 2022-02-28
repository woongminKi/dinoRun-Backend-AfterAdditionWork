const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
