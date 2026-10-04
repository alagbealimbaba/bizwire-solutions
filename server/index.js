require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const postsRouter = require("./routes/posts");
const contactRouter = require("./routes/contact");

connectDB().catch((err) => {
  console.error("Failed to connect to MongoDB:", err);
  process.exit(1);
});

const app = express();

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
];
app.use(cors({
  origin: (origin, cb) => {
    const isLocalOrigin = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin || "");
    const isDevelopment = process.env.NODE_ENV !== "production";
    if (!origin || isDevelopment || isLocalOrigin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error("Not allowed by CORS"));
  },
}));
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/contact", contactRouter);
app.get("/health", (_, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
