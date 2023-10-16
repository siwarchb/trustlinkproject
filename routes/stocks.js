var express = require("express");
const demandestock = require("../models/Demandestock");
const Emplacement = require("../models/Emplacement");
var router = express.Router();
const Stock = require("../models/Stock");
const Ticket = require("../models/Ticket");
var multer = require("multer");
var path = require("path");
var XLSX = require("xlsx");

/////////////////////////////// import

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploads = multer({ storage: storage });

//import Pieces
router.post("/uploadfilepiece", uploads.single("file"), async (req, res) => {
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  var x = 0;
  sheet_namelist.forEach((element) => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    Stock.insertMany(xlData, (err, data) => {
      if (err) {
        console.log(err.message);
        return res.status(200).json({
          title: "error",
        });
      } else {
        console.log("mrigel");
        return res.status(200).json({
          title: "mrigel",
        });
      }
    });
    x++;
  });
  // res.redirect('/');
});

// check if reference exist
router.get("/getreference/:reference", async (req, res) => {
  try {
    await Stock.findOne({ reference: req.params.reference })
    .then((result) => {
      console.log(result);

      if (result) {
        res.send("reference existe");
      } else {
        res.send("null");
      }
    });
  } catch (err) {
    res.send("null");
  }
});

// get all machines
router.get("/getstocksproduits", async (req, res) => {
  try {
    await Stock.find({ type: "produit" })
      .sort({ created_at: -1 })
      .populate(["emplacement_id"])
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// get all piece rechange
router.get("/getstockspr", async (req, res) => {
  try {
    await Stock.find({ type: "piece de rechange" })
      .sort({ created_at: -1 })
      .populate(["emplacement_id"])
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// get emplacements stockage
router.get("/getemplacementsstockage", async (req, res) => {
  try {
    await Emplacement.find({ type: "Stockage" })
      .sort({ created_at: -1 })
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//get all pr by ticket
router.get("/getpiecesderechanges/:id", async (req, res) => {
  Ticket.findOne({ _id: req.params.id }, async function (err, ticket) {
    try {
      console.log(ticket);

      await Stock.find({
        type: "piece de rechange",
        produit: ticket.typeproduit,
      })
        .sort({ created_at: -1 })
        .populate(["emplacement_id"])
        .then((result) => {
          res.send(result);
        });
    } catch (err) {
      console.log(err);
    }
  });
});

// add pr in emplacement also
router.post("/addpr", async (req, res) => {
  const pr = new Stock({
    prixunit: req.body.prixunit,
    reference: req.body.reference,
    marque: req.body.libelle,
    produit: req.body.produit,
    quantite: req.body.quantite,
    type: req.body.type,
    emplacement_id: req.body.emplacement_id,
  });

  pr.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send({ message: "emplacement added successfully!" });
  });

  Emplacement.findOne(
    { _id: req.body.emplacement_id },
    function (err, emplacement) {
      pdt = {
        modele: req.body.reference,
        marque: req.body.libelle,
      };

      emplacement.capaciterestante =
        emplacement.capaciterestante - req.body.quantite;
      const emp = emplacement.produits;
      emp.push(pdt);
      // emp.push(modele,marque);
      // console.log(emp);
      // emp.marque.push(marque);

      emplacement.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        console.log("emp added");
      });
    }
  );
});

// get all pr types

router.get("/gettypepr", async (req, res) => {
  try {
    await Stock.find({ type: "piece de rechange" }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});
//add pr and change etat demande

router.post("/addprdemande", async (req, res) => {
  Stock.findOne({ reference: req.body.reference }, function (err, stock) {
    stock.quantite = parseInt(stock.quantite) + parseInt(req.body.quantite);
    stock.type = req.body.type;
    (stock.emplacement_id = req.body.emplacement_id),
      (stock.produit = req.body.produit),
      stock.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "stock edited successfully!" });
      });
  });

  demandestock.findOne({ _id: req.body.demande }, function (err, demande) {
    demande.etat = "traité";
    demande.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      console.log("demande modifie");
    });
  });

  Ticket.findOne({ _id: req.body.ticket_id }, function (err, ticket) {
    ticket.etat = "PRreçu";
    ticket.save();
  });

  Emplacement.findOne(
    { _id: req.body.emplacement_id },
    function (err, emplacement) {
      pdt = {
        modele: req.body.reference,
        marque: req.body.libelle,
      };
      const emp = emplacement.produits;
      emp.push(pdt);
      // emp.push(modele,marque);
      // console.log(emp);
      // emp.marque.push(marque);

      emplacement.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        console.log("emp added");
      });
    }
  );
});

// delete piece

router.delete("/deletepiece/:id", async (req, res) => {
  Stock.findOne({ _id: req.params.id }).then((stock) => {
    Emplacement.findOne(
      { _id: stock.emplacement_id },
      function (err, emplacement) {
        pdt = {
          modele: stock.reference,
          marque: stock.libelle,
        };

        emplacement.capaciterestante =
          emplacement.capaciterestante + stock.quantite;
        const emp = emplacement.produits;
        emp.push(pdt);

        emplacement.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          console.log("emp added");
        });
      }
    );
  });

  Stock.deleteOne({ _id: req.params.id })
    .then((result1) => {
      res.status(200).json({
        message: "piece supprimé",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//get pr by id

router.get("/getprbyid/:id", async (req, res) => {
  try {
    await Stock.findOne({ _id: req.params.id })
      .populate(["emplacement_id"])

      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});
//edit pr

router.put("/editpr", async (req, res) => {
  const stock = await Stock.findOne({ _id: req.body.id });
  (stock.marque = req.body.marque),
    (stock.reference = req.body.reference),
    (stock.emplacement_id = req.body.emplacement_id),
    (stock.prixunit = req.body.prixunit),
    (stock.quantite = req.body.quantite),
    (stock.produit = req.body.produit),
    stock.save((err) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        title: "stock  modifié",
      });
    });
});

//get pr by id

router.get("/checkuniqreference", async (req, res) => {
  console.log(req.params);

  // try {
  //   await Stock.findOne({ reference: req.body.reference })

  //     .then((result) => {
  //       console.log(result);
  //       res.send(result);
  //     });
  // } catch (err) {
  //   console.log(err);
  // }
});

// check unicity reference

router.get("/getprbyid/:id", async (req, res) => {
  try {
    await Stock.findOne({ _id: req.params.id })
      .populate(["emplacement_id"])

      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
