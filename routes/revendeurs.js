var express = require("express");
var router = express.Router();
const Revendeur = require("../models/Revendeur");

//get Revendeurs
router.get("/getrevendeurs", async (req, res) => {
  try {
    await Revendeur.find().then((result) => {
      res.send(result);
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// add Revendeur

router.post("/addrevendeur", async (req, res) => {
  const revendeur = new Revendeur({
    email: req.body.email,
    nom: req.body.nom,
    prenom: req.body.prenom,

    adresse: req.body.adresse,
    telephone: req.body.telephone,
    type: req.body.type,
  });
  revendeur.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Revendeur added successfully!" });
  });
});

module.exports = router;
