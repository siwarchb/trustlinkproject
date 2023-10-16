var express = require("express");
const Emplacement = require("../models/Emplacement");
var router = express.Router();
const Stock = require("../models/Stock");
const Demandestock = require("../models/Demandestock");
const Ticket = require("../models/Ticket");

// Route to get all stock demands
router.get("/getdemandes", async (req, res) => {
  try {
    await Demandestock.find({}).populate(['user_id']).then((result) => {
      res.send(result);
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to get a single stock demand by its ID
router.get("/getdemandebyid/:id", async (req, res) => {
  try {
    await Demandestock.findOne({ _id: req.params.id }).then((result) => {
      res.send(result);
      console.log(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to get all spare parts stocks
router.get("/getstockspr", async (req, res) => {
  try {
    await Stock.find({ type: "piece de rechange" }).populate(['emplacement_id']).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to get all storage locations
router.get("/getemplacementsstockage", async (req, res) => {
  try {
    await Emplacement.find({ type: "Stockage" }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route to add a new stock demand
router.post("/addemande", async (req, res) => {
  const pr = new Stock({
    reference: req.body.reference,
    marque: req.body.libelle,
    produit: req.body.produit,
    quantite: req.body.quantite,
    type: req.body.type,
    emplacement_id: req.body.emplacement_id,
  });

  // Save the stock
  pr.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "stock added successfully!" });
  });

  // Add the product to the emplacement
  Emplacement.findOne({ _id: req.body.emplacement_id }, function (err, emplacement) {
    pdt = {
      modele: req.body.reference,
      marque: req.body.libelle
    };
    const emp = emplacement.produits;
    emp.push(pdt);

    emplacement.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      console.log("product added to emplacement");
    });
  });
});

module.exports = router;
