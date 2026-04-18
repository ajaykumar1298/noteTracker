import jwt from "jsonwebtoken";

export async function checkUser(req, res, next) {
  try {
    let token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token not found",
      });
    }
    let decoded = jwt.verify(token, process.env.JWT_URI);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong",
    });
  }
}
