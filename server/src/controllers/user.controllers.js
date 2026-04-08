import userModel from "../models/user.models.js";
export const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById({
      _id: req.userId,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "current user fetched successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get current user error: ${error.message}` });
  }
};
