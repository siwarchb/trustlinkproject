const express = require("express");
const router = express.Router();
const Log = require("../models/TicketLog");

// get all logs
router.get("/", (req, res) => {
  console.log("Request received for /logs endpoint");
  Log.find()
    .then((logs) => res.json(logs))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
