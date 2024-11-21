import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

// Protect Route Middleware
export const protect = async (req, res, next) => {
  try {
    let token;

    // Token ko cookies se ya authorization headers se lena
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res.status(401).json({
        message: "Login to get access.",
      });
    }

    // Agar token 'logout' hai to unauthorized access
    if (token === "logout") {
      return res.status(401).json({
        message: "Login to get access.",
      });
    }

    // Token verify karna
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User ko database se dhoondhna
    const user = await userModel.findById(decoded.id);

    // Agar user nahi milta
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // User object ko request me attach karna
    req.user = user;
    next();
  } catch (err) {
    // Agar token invalid hai ya kisi aur error ki wajah se fail hota hai
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please log in again.",
      });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please log in again.",
      });
    }
    // General server error handling
    res.status(500).json({
      message: "Server Error Protect",
      error: err.message,
    });
  }
};

// Role Authorization Middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // Agar user ka role authorized roles me nahi hai
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Aapko is resource ka access nahi hai.",
      });
    }
    next();
  };
};
