const express = require("express");
const app = express();
const PORT = 3000;
const urlRoute = require("./routes/url");
const { connectToDB } = require("./connect");
const URL = require("./models/url");

connectToDB("mongodb://localhost:27017/short-URL").then(() => {
  console.log("Database Connected");
});

app.use(express.json());

app.use("/url", urlRoute);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const visit = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(visit.redirectURL);
});

app.listen(PORT, () => console.log("Server is running on port", PORT));
