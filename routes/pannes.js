var express = require("express");
const Categorie = require("../models/Categorie");
const Article = require("../models/Article");
var router = express.Router();

const Panne = require("../models/Panne");

//get pannes
router.get("/getpannes", async (req, res) => {
  try {
    await Panne.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// add panne
router.post("/addapanne", async (req, res) => {
  const panne = new Panne({
    name: req.body.name,
    groupe: req.body.groupe,
    article: req.body.article,
  });

  panne.save();

  return res.status(200).json({
    title: "panne ajouté",
  });
});
//deletepanne
router.delete("/deletepanne/:id", (req, res, next) => {
  Panne.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "panne supprimé",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
// add categorie
router.post("/addcategorie", async (req, res) => {
  const categorie = new Categorie({
    name: req.body.name,
  });

  categorie.save();

  return res.status(200).json({
    title: "categorie ajouté",
  });
});
//get categories
router.get("/getcategories", async (req, res) => {
  try {
    await Categorie.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

/////////////////articles/////
// add article
router.post("/addarticle", async (req, res) => {
  const article = new Article({
    name: req.body.name,
    groupe: req.body.groupe,
  });

  article.save();

  return res.status(200).json({
    title: "categorie ajouté",
  });
});
//get articles
router.get("/getarticles", async (req, res) => {
  try {
    await Article.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
