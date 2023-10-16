var express = require("express");
var router = express.Router();
const Emplacement = require("../models/Emplacement");

//get one empla
router.get("/getemplacementbyid/:id", async (req, res) => {
  try {
    await Emplacement.findOne({ _id: req.params.id })
      .sort({ created_at: -1 })
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});
//get emplacements
router.get("/getemplacements", async (req, res) => {
  try {
    await Emplacement.find()
      .sort({ created_at: -1 })
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// add emplacement
router.post("/addemplacement", async (req, res) => {
  const emplacement = new Emplacement({
    code: req.body.code,
    nom: req.body.nom,
    produit: req.body.produit,
    capacite: req.body.capacite,
    type: req.body.type,
    capaciterestante: req.body.capacite,
  });

  emplacement.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "emplacement added successfully!" });
  });
});

//delete
router.delete("/deletemplacement/:id", (req, res, next) => {
  Emplacement.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "emplacement supprimé",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// edit

router.put("/editemplacement", async (req, res) => {
  const emplacement = await Emplacement.findOne({ _id: req.body.id });
  (emplacement.nom = req.body.nom),
    (emplacement.code = req.body.code),
    (emplacement.type = req.body.type),
    (emplacement.capaciterestante =
      req.body.capacite - emplacement.capacite + emplacement.capaciterestante),
    (emplacement.capacite = req.body.capacite),
    emplacement.save((err) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        title: "emplacement  modifié",
      });
    });
});

router.get("/getcode/:code", async (req, res) => {
  try {
    await Emplacement.findOne({ code: req.params.code })
    .then((result) => {
      console.log(result);

      if (result) {
        res.send("code existe");
      } else {
        res.send("null");
      }
    });
  } catch (err) {
    res.send("null");
  }
});

module.exports = router;
