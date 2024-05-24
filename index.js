const express = require("express");
const messageRouter = require("./routes/messageRouter");
const dotenv = require("dotenv");
const app = express();

dotenv.config();
app.use(express.json());

app.use(messageRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(4000, () =>
  console.log(`Server is ready in on port ${4000}`)
);
