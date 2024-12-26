import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATA_BASE_URL,
});

export default pool;
