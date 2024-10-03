const express = require("express");
const app = express();
const PORT = 3000;
const urlRoute = require("./routes/url");
const { connectToDB } = require("./connect");
const URL = require("./models/url");
const path = require("path");
const staticRoute = require("./routes/staticRouter");
const exp = require("constants");

connectToDB("mongodb://localhost:27017/short-URL").then(() => {
  console.log("Database Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const visit = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!visit) return res.status(404).send("Short URL not found");
  res.redirect(visit.redirectURL);
});

app.listen(PORT, () => console.log("Server is running on port", PORT));
