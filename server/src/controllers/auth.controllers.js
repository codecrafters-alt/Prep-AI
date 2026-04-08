import jwt from "jsonwebtoken";
import userModel from "../models/user.models.js";

//it is for google authentication means both login and registration
export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await userModel.findOne({
      email: email,
    });

    if (!user) {
      user = await userModel.create({
        name: name,
        email: email,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.cookie("token", token, {
      http: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, //7 days
    });
    return res
      .status(200)
      .json({ message: "user authenticated successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Google auth error: ${error.message}` });
  }
};

export const logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    return res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};
