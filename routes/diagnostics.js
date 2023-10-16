var express = require("express");
var router = express.Router();
const Diagnostic = require("../models/Diagnostic");
var nodeMailer = require("nodemailer");
const demandestock = require("../models/Demandestock");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Ticket = require("../models/Ticket");
const Stock = require("../models/Stock");
const Offre = require("../models/Offre");

// Route to save pr and pannes, and store ticket state in "en_attente_pr"
router.post("/adddiagnosticpr", async (req, res) => {
  // Find the ticket and update its state
  Ticket.findOne({ _id: req.body.ticket }, (err, ticket) => {
    ticket.etat_garantie = " "; // You may need to validate the condition here
    ticket.save();
  });

  const listedespieces = [];
  // Iterate over piecesderechanges and update stock quantities
  req.body.piecesderechanges.forEach((piece, index, array) => {
    const piecederechanges = {
      quantite: piece.newpr.quantite,
      prixunit: piece.newpr.prixunit,
      produit: piece.newpr.produit,
    };
    listedespieces.push(piecederechanges);

    // Update stock quantities
    Stock.findOne({ reference: piece.newpr.produit }, (err, stock) => {
      stock.quantite = stock.quantite - piece.newpr.quantite;
      stock.save();
    });
  });

  // Create a new diagnostic
  const diagnostic = new Diagnostic({
    ticket_id: req.body.ticket,
    piecesderechanges: listedespieces,
    pannes: req.body.panne,
    commentaire: req.body.commentaire,
    categorie_id: req.body.categorie,
    article_id: req.body.article,
  });

  // Save the diagnostic
  diagnostic.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "diagnostic added successfully!" });
  });
});

// Route to add a diagnostic when etat_garantie is "garantie"
router.post("/adddiagnostictypeautre", async (req, res) => {
  Ticket.findOne({ _id: req.body.ticket }, (err, ticket) => {
    ticket.etat_garantie = "garantie";
    ticket.etat = "réparation en cours";
    ticket.save();
  });

  const listedespieces = [];
  req.body.piecesderechanges.forEach((piece, index, array) => {
    const piecederechanges = {
      quantite: piece.newpr.quantite,
      prixunit: piece.newpr.prixunit,
      produit: piece.newpr.produit,
    };
    listedespieces.push(piecederechanges);
  });

  const diagnostic = new Diagnostic({
    ticket_id: req.body.ticket,
    piecesderechanges: listedespieces,
    pannes: req.body.panne,
    commentaire: req.body.commentaire,
    categorie_id: req.body.categorie,
    article_id: req.body.article,
  });

  diagnostic.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "diagnostic added successfully!" });
  });
});

// Route to add a diagnostic
router.post("/adddiagnostic", async (req, res) => {
  // Check if a diagnostic already exists for the ticket
  Diagnostic.findOne(
    { ticket_id: req.body.ticket },
    function (err, diagnostic) {
      if (diagnostic) {
        // If a diagnostic exists, update piecesderechanges
        req.body.piecesderechanges.forEach((piece, index, array) => {
          const piecederechanges = {
            quantite: piece.newpr.quantite,
            prixunit: piece.newpr.prixunit,
            produit: piece.newpr.produit,
          };
          const pr = diagnostic.piecesderechanges;
          pr.push(piecederechanges);
        });

        diagnostic.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "ticket added successfully!" });
        });

        // Update ticket state
        Ticket.findOne({ _id: req.body.ticket }, (err, ticket) => {
          ticket.etat_garantie = "garantie";
          ticket.etat = "réparation en cours";
          ticket.save();
        });
      } else {
        // If a diagnostic does not exist, create a new one
        Ticket.findOne({ _id: req.body.ticket }, (err, ticket) => {
          ticket.etat_garantie = "garantie";
          ticket.etat = "réparation en cours";
          ticket.save();
        });

        const listedespieces = [];
        req.body.piecesderechanges.forEach((piece, index, array) => {
          const piecederechanges = {
            quantite: piece.newpr.quantite,
            prixunit: piece.newpr.prixunit,
            produit: piece.newpr.produit,
          };
          listedespieces.push(piecederechanges);
        });

        const diagnostic = new Diagnostic({
          ticket_id: req.body.ticket,
          piecesderechanges: listedespieces,
          pannes: req.body.panne,
          commentaire: req.body.commentaire,
          categorie_id: req.body.categorie,
          article_id: req.body.article,
        });

        diagnostic.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "diagnostic added successfully!" });
        });

        // Create and save an Offre
        const offre = new Offre({
          ticket_id: req.body.ticket,
          client_id: req.body.client_id,
          piecesderechanges: listedespieces,
          prixmain: "",
          prix_oeuvre: "",
          duree: "",
          date_confirmation: "",
          etat_reception: "",
          etat_confirmation: "",
          date_reception: Date.now(),
          type: "interne",
        });

        offre.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          console.log("offre added");
        });
      }
    }
  );
});

// add emplacement
router.post("/sendmail", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body.ticket });
  ticket.etat = "en_attente_pr";
  ticket.save();
  let token = req.body.token;

  jwt.verify(token, "secretkey", (err, decoded) => {
    if (err)
      return res.status(401).json({
        title: "unauthorized",
      });
    //token is valid
    User.findOne({ _id: decoded.userId }, (err, user) => {
      let current = user._id;
      if (err) return console.log(err);
      return current;
    });
    const demande = new demandestock({
      user_id: decoded.userId,
      produit: req.body.pr,
      quantite: req.body.quantite,
      marque: req.body.marque,
      etat: "en cours",
      ticket_id: req.body.ticket,
    });
    demande.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      console.log("send demande success");
    });
  });

  let duree = new Date();
  let adresse = req.body.email;
  let transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "nextconsult01@gmail.com",
      pass: "aqqrayirwswvhwkz",
    },
  });
  let mailOptions = {
    from: '"NextConsult" <nextconsult01@gmail.com>', // sender address
    to: adresse, // list of receivers
    subject: "demande de stock", // Subject line
    text: "demande de stock", // plain text body
    html:
      "<b>vous avez une demande de stock concernant le produit </b>" +
      req.body.pr +
      "<b> d'une quantité de </b>" +
      req.body.quantite +
      "<b> le </b>" +
      duree +
      "<b> merci de confirmer </b>", // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s");
  });

  res.send({ message: "email bien envoyé!" });
});

//get diagnostic by ticket
router.get("/getdiagnosticsbyid/:id", async (req, res) => {
  console.log("result.piecesderechanges");

  try {
    await Diagnostic.findOne({ ticket_id: req.params.id }).then((result) => {
      res.send(result.piecesderechanges);
      console.log(result.piecesderechanges);
    });
  } catch (err) {
    console.log(err);
  }
});

//get diagnost pr en attente
router.get("/getdiagnosticsbyticket/:id", async (req, res) => {
  try {
    await Diagnostic.findOne({ ticket_id: req.params.id })
      .populate("categorie_id", "article_id")

      .then((result) => {
        res.send(result);
        console.log(result);
      });
  } catch (err) {
    console.log(err);
  }
});
//get diagnostic by ticket etat en attente pr
router.get("/getdiagnosticsbyticketid/:id", async (req, res) => {
  try {
    await Diagnostic.findOne({ ticket_id: req.params.id }).then((result) => {
      res.send(result.piecesderechanges);
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getpannebyticket/:id", async (req, res) => {
  try {
    await Diagnostic.findOne({ ticket_id: req.params.id }).then((result) => {
      res.send(result.pannes);
    });
  } catch (err) {
    console.log(err);
  }
});

// update reparation

router.put("/updatereparationticket", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body._id });
  (ticket.etat = "réparation terminé"),
    ticket.save((err) => {
      if (err) {
        console.log("err");
      }
      return res.status(200).json({
        title: "ticket  réparé",
      });
    });
});

router.put("/updateclotureticket", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body._id });
  (ticket.etat = "clôturé et décharge recu"),
    ticket.save((err) => {
      if (err) {
        console.log("err");
      }
      return res.status(200).json({
        title: "ticket clôturé et décharge recu",
      });
    });
});

router.put("/updatelivrerticket", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body._id });
  (ticket.etat = "livré sans décharge"),
    ticket.save((err) => {
      if (err) {
        console.log("err");
      }
      return res.status(200).json({
        title: "ticket livré sans décharge",
      });
    });
});

module.exports = router;
