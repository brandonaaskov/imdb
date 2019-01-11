require("dotenv").config();
const _ = require("lodash");
const express = require("express");
const { getEpisodes } = require("./imdb");

const app = express();
const { HOST, PORT } = process.env;

app.set("port", PORT);
// app.use(cors())

app.get("/", (req, res) => {
  return res.json({ error: "these are not the routes you are looking for" });
});

app.get("/episodes", async (req, res) => {
  const { show, episodes } = await getEpisodes(req.query.name);
  return res.json({ show, episodes });
});

// Listen the server
app.listen(PORT, HOST);
console.log(`Server listening on http://${HOST}:${PORT}`);
