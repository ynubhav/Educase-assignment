import express from "express";
import dotenv from "dotenv";
import { initDB } from "./models/school.model.js";
import { schoolRouter } from "./routes/school.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// catching malformed json body
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      success: false,
      message: "Malformed JSON in request body",
    });
  }
});

//initialize the database and create tables if not exist
await initDB().catch((err) => {
  console.error("DB init failed:", err);
  process.exit(1);
});

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the School API" });
});

//routing all api requests to /api
app.use("/api", schoolRouter);

//404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

//starting the server
const PORT = process.env.PORT || 3000; // fall back to port 3000

app.listen(PORT, () => console.log(` School API running on port ${PORT}`));
