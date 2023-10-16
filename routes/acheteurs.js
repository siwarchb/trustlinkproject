// Importing necessary modules and models
var express = require("express");
var router = express.Router();
const Acheteur = require("../models/Acheteur");

// Route to get all Acheteurs
router.get("/getacheteurs", async (req, res) => {
  try {
    await Acheteur.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to get emails of all Acheteurs
router.get("/getacheteursemails", async (req, res) => {
  try {
    await Acheteur.find()
      .select('email')
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// Route to add a new Acheteur
router.post("/addacheteur", async (req, res) => {
  const acheteur = new Acheteur({
    email: req.body.email,
    nom: req.body.nom,
    telephone: req.body.telephone,
    prenom: req.body.prenom,
  });

  acheteur.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Acheteur added successfully!" });
  });
});

// Exporting the router
module.exports = router;
