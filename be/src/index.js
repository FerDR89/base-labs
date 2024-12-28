import "dotenv/config";
import { app } from "./config/express.js";
import pool from "./config/db.js";
import { authenticate, rateLimit } from "./middlewares/middlewares.js";

app.get("/my-purchase/:product_name", authenticate, async (req, res) => {
  const { userId } = req;
  const { product_name } = req.params;
  try {
    const client = await pool.connect();
    const query = `SELECT amount, product_name FROM user_purchases WHERE user_id = $1 AND product_name = $2`;
    const values = [userId, product_name];
    const result = await client.query(query, values);

    client.release();

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/buy", authenticate, rateLimit("buy"), async (req, res) => {
  const { userId } = req;
  const { product_name } = req.body;

  if (!product_name)
    return res
      .status(400)
      .json({ error: "product name is missing from the request" });

  try {
    const client = await pool.connect();
    const query = `
    WITH updated AS (
      UPDATE user_purchases
      SET amount = amount + 1
      WHERE user_id = $1 AND product_name = $2
      RETURNING product_name, amount
    ),

    inserted AS (
      INSERT INTO user_purchases (user_id, product_name, amount)
      SELECT $1, $2, 1
      WHERE NOT EXISTS (SELECT 1 FROM updated)
      RETURNING product_name, amount
    )
  
    SELECT * 
    FROM updated
    UNION ALL
    SELECT * 
    FROM inserted;
`;

    const values = [userId, product_name];
    const result = await client.query(query, values);

    client.release();

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
