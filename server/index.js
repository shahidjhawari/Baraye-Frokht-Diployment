const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

app.use(
  cors({
    origin: [
      "https://barayefrokht.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/api", router);

const PORT = 8080;

connectDB().then((conn) => {
  if(conn){  // ✅ sirf tab server start ho jab DB connect hosa
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
    });
  } else {
    console.log("❌ Server start nahi hua — MongoDB connect nahi hua!")
  }
});