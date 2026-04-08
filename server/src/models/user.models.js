import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    //add user fields here
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    //here we will use google authentication for login so we don't need password because we will use google auth token to verify user
    credits: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
