import { decodeToken } from "../utils/jwt.js";
import pool from "../config/db.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Authorization header is missing or invalid" });
  }

  const token = await decodeToken(authHeader);

  if (token) {
    req.userId = token.userId;
    next();
  } else {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const rateLimit = (resource) => {
  return async (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
      return res.status(500).json({ error: "User ID is missing from request" });
    }

    try {
      const client = await pool.connect();
      const query = `SELECT last_access FROM rate_limits WHERE user_id = $1 AND resource = $2`;
      const values = [userId, resource];
      const result = await client.query(query, values);

      const now = new Date();

      if (result.rows.length > 0) {
        const lastAccess = new Date(result.rows[0].last_access);
        const timeDifference = (now - lastAccess) / 1000;

        if (timeDifference < 60) {
          client.release();
          return res
            .status(429)
            .json({ error: "Rate limit exceeded. Try again later." });
        }
      }

      const upsertQuery = `
              INSERT INTO rate_limits (user_id, resource, last_access) 
              VALUES ($1, $2, $3)
              ON CONFLICT (user_id, resource) 
              DO UPDATE SET last_access = $3
          `;

      await client.query(upsertQuery, [userId, resource, now]);
      client.release();
      next();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

export { authenticate, rateLimit };
