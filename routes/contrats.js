// Importing necessary modules and models
var express = require("express");
var router = express.Router();
const Contrat = require("../models/Contrat");
const Event_contrat = require("../models/Event_contrat");
const randomColor = require('randomcolor');

// Route to get all contracts
router.get("/getcontrats", async (req, res) => {
  try {
    await Contrat.find().populate(["client_id"]).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to add a new contract
router.post("/addcontrat", async (req, res) => {
  const contrat = new Contrat({
    Reference: req.body.Reference,
    client_id: req.body.client_id,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
    nb_intervention: req.body.nb_intervention,
    listemachines: req.body.listemachines,
    listetechniciens: req.body.listetechniciens,
  });

  // Create the event of the contract too
  const colorrandom = randomColor();
  const event = new Event_contrat({
    subject: req.body.Reference,
    client_id: req.body.client_id,
    date_debut: req.body.date_debut,
    date_fin: req.body.date_fin,
    nb_intervention: req.body.nb_intervention,
    listemachines: req.body.listemachines,
    listetechniciens: req.body.listetechniciens,
    color: colorrandom,
  });

  // Save the contract
  contrat.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "contrat added successfully!" });
  });

  // Save the event
  event.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log("Event successfully created");
  });
});

// Route to get a contract by its ID
router.get("/getcontratById/:id", async (req, res) => {
  try {
    await Contrat.findOne({ _id: req.params.id })
      .populate(["client_id", "listetechniciens", "listemachines"])
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// Export the router
module.exports = router;
