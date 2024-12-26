import express from "express";

export const app = express();

// app.use(
//     cors({
//       origin: "http://localhost:3031",
//     })
//   );

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
