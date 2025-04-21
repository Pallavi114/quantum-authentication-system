const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"], // Ensures valid email
      index: true // Improves performance
    },
    password: { type: String, required: true, minlength: 6 } // Minimum password length
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt
);

module.exports = mongoose.model("User", UserSchema);
