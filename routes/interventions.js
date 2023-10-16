var express = require("express");
var router = express.Router();
const Intervention = require("../models/Intervention");

//get all interventions

router.get("/getinterventions", async (req, res) => {
  try {
    await Intervention.find()
      .populate(["client_id"])
      .then((result) => {
        console.log(result);
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//add new intervention
router.post("/addintervention", async (req, res) => {
  const intervention = new Intervention({
    Reference: req.body.Reference,
    client_id: req.body.client_id,
    date: req.body.date,
    listemachines: req.body.listemachines,
    listetechniciens: req.body.listetechniciens,
  });
  intervention.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "intervention added successfully!" });
  });
});
module.exports = router;
