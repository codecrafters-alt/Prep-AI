import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized token not found" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized invalid token" });
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: `isAuth error: ${error.message}` });
  }
};
