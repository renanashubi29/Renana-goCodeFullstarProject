import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    userId: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    status: {
      type: String,
      enum: ["active", "blocked", "expired"],
      default: "active"
    },

    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

 const User = mongoose.model("User", userSchema);
 export default User;
