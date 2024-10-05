const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const shortId = shortid();
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: "URL is required." });

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortId,
  });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalVisits: result.visitHistory.length,
    history: result.visitHistory,
  });
}

module.exports = {
  generateNewShortURL,
  getAnalytics,
};
