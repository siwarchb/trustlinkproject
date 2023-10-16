var express = require("express");
var router = express.Router();
const Contrat = require("../models/Contrat");
const Event_contrat = require("../models/Event_contrat");

//get all events

router.get("/getevents", async (req, res) => {
  try {
    await Event_contrat.find()
      .populate(["client_id", "listetechniciens", "listemachines"])
      .then((result) => {
        console.log(result);
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//get all events by techncicien

router.get("/geteventsbytechnicien/:id", async (req, res) => {
  const yourTechnicianId = req.params.id; // your technician ID
  try {
    const events = await Event_contrat.find({
      listetechniciens: { $elemMatch: { $eq: yourTechnicianId } },
    })
      .populate(["client_id", "listetechniciens", "listemachines"])
      .exec();
    res.send(events);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
