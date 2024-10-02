const express = require("express");
const router = express.Router();
const { generateNewShortURL, getAnalytics } = require("../controllers/url");

router.post("/", generateNewShortURL);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
