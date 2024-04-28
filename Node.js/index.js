const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const ip = require("ip");
const ipAddr = ip.address();

let LHV = "Slytherin";

app.get("/house", (req, res) => {
  res.json({ message: LHV });
});

app.post("/house", (req, res) => {
  LHV = req.body.house;
  res.json({ message: LHV });
});

app.use(cors());
app.use(express.json());

app.use("/", require("./routes/start"));

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${ipAddr}:${port}`);
  });
};

initializeApp();