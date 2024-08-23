import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not authorized login or signUp",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // Handle expired token
      return res.status(401).send("Token has expired");
    } else {
      // Handle other errors
      return res.status(400).send("Invalid token");
    }
  }
};

export default authMiddleware;
