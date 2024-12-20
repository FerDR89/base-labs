import { decodeToken } from "./jwt.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header missing or invalid" });
  }

  const token = await decodeToken(authHeader);

  if (token) {
    req.userId = token.userId;
    next();
  } else {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export { authenticate };
