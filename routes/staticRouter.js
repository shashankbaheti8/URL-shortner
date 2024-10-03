const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, res) => {
  const allURLS = await URL.find({});
  console.log(allURLS);
  return res.render("home", {
    urls: allURLS,
  });
});

module.exports = router;
