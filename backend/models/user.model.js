import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fName: String,
    lName: String,
    email: { type: String, unique: true, sparse: true },
    googleId: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
