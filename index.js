const express = require("express");
const formidableMiddleware = require("express-formidable");
const cors = require("cors");
const axios = require("axios");
const generateHash = require("./utils/generateHash");
const app = express();

app.use(formidableMiddleware());
app.use(cors());
require("dotenv").config();

app.post("/comics", async (req, res) => {
  const hash = generateHash();
  const id = req.fields.id;

  const response = await axios.get(
    `https://gateway.marvel.com:443/v1/public/comics?characters=${id}&ts=1&apikey=cab92542e13d38df079c8fc7d19626a3&hash=${hash}`
  );
  console.log(response.data.data);
  res.json({ message: " parfait" });
});

app.get("/", async (req, res) => {
  const hash = generateHash();
  console.log(hash);
  const response = await axios.get(
    "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=cab92542e13d38df079c8fc7d19626a3&hash=" +
      hash
  );
  res.json(response.data.data);
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
app.listen(process.env.PORT, (req, res) => {
  console.log("go server");
});
