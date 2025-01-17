const express = require('express');
const cors = require("cors");
const app = express();
const port = 3000;

const ip = require("ip");
const ipAddr = ip.address();

let LHV = "Gryffindor";

app.get("/house", (req, res) => {
  return res.json({ message: LHV });
});

app.post("/house", (req, res) => {
  LHV = req.body.house;
  return res.json({ message: LHV });
});

app.use(cors());
app.use(express.json());

app.use("/", require("./Node.js/routes/start"));

const initializeApp = () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${ipAddr}:${port}`);
  });
};

initializeApp();