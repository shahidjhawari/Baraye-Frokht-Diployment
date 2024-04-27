const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://barayefrokht.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Set secure and sameSite options for cookies
app.use((req, res, next) => {
  res.cookie("SameSite", "None", { secure: true }); // Ensure cookies are sent only over HTTPS
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log("Server is running on port " + PORT);
  });
});

module.exports = app;
