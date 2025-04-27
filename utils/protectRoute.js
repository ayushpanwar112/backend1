import jwt from "jsonwebtoken";
import errorResponse from "../middleware/errorResponse.js";

export const protectRoute = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({
      status: "failed",
      message: "Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info to request
    next();
  } catch (err) {
    return next(new errorResponse("Unauthorized", 401));
  }
};

export default protectRoute;