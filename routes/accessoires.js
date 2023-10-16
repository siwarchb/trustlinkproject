// Importing necessary modules and models
var express = require("express");
var router = express.Router();
const Accessoire = require("../models/Accessoire");

// Route to get all Accessoires
router.get("/getaccessoires", async (req, res) => {
  try {
    await Accessoire.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to get Accessoires by type of machine 
router.get("/getaccessoiresbytype/:val", async (req, res) => {
  try {
    await Accessoire.find({ produit: req.params.val })
      .then((result) => {
        res.send(result);
        console.log(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// Route to add a new Accessoire
router.post("/addaccesoire", async (req, res) => {
  const accessoire = new Accessoire({
    libelle: req.body.libelle,
    reference: req.body.reference,
    produit: req.body.produit,
  });

  accessoire.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "Accessoire added successfully!" });
  });
});

// Route to get an Accessoire by its ID
router.get("/getaccessoirebyid/:id", async (req, res) => {
  try {
    await Accessoire.findOne({ _id: req.params.id }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to edit an Accessoire
router.put("/editaccessoire", async (req, res) => {
  const accessoire = await Accessoire.findOne({ _id: req.body.id });
  accessoire.libelle = req.body.libelle;
  accessoire.reference = req.body.reference;
  accessoire.produit = req.body.produit;

  accessoire.save((err) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      title: "accessoire  modifié",
    });
  });
});

// Route to delete an Accessoire by its ID
router.delete("/deleteaccessoire/:id", async (req, res) => {
  Accessoire.deleteOne({ _id: req.params.id })
    .then((result1) => {
      res.status(200).json({
        message: "Accessoire supprimé",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// Exporting the router
module.exports = router;
