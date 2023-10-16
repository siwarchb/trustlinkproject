const express = require("express");
const router = express.Router();
const Offre = require("../models/Offre");
const Ticket = require("../models/Ticket");
const Client = require("../models/Client");
const Stock = require("../models/Stock");
const Emplacement = require("../models/Emplacement");
const Diagnostic = require("../models/Diagnostic");
const User = require("../models/User");
const nodeMailer = require("nodemailer");

///////////offres area///////////////

//get diagnostic by ticket
router.get("/getdevibyid/:id", async (req, res) => {
  try {
    await Offre.findOne({ _id: req.params.id })
      .populate(["ticket_id"])
      .populate(["client_id"])
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

/////////get all devis
router.get("/getoffres_client/:id", async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  const client = await Client.findOne({ email: user.email });

  try {
    await Offre.find({
      $and: [
        {
          client_id: client._id,
        },
        {
          etat_reception: "confirmé",
        },
      ],
    })
      .sort({ created_at: -1 })
      .populate(["ticket_id"])
      .populate(["client_id"])
      .then((result) => {
        res.send(result);
        console.log(result);
      });
  } catch (err) {
    console.log(err);
  }
});

///////accepte client///
router.put("/acceptoffreclient", async (req, res) => {
  const offre = await Offre.findOne({ _id: req.body._id });
  const ticket = await Ticket.findOne({ _id: offre.ticket_id });
  ticket.etat = "en attente de facturation";
  offre.etat_confirmation = "confirmé";

  offre.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  ticket.save((err) => {
    if (err) {
      console.log(err);
    }
    console.log("ticket updated");
  });

  return res.status(200).json({
    title: "offre accepté",
  });
});

///////refuse client///
router.put("/refuseoffreclient", async (req, res) => {
  const offre = await Offre.findOne({ _id: req.body._id });
  const ticket = await Ticket.findOne({ _id: offre.ticket_id });
  ticket.etat = "refusé par réception";
  offre.etat_confirmation = "refusé";

  offre.save((err) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      title: "offre refusé",
    });
  });

  ticket.save((err) => {
    if (err) {
      console.log(err);
    }
    console.log("ticket updated");
  });
});

/////////////////////////////////////////

//get offres externes type
router.get("/getoffres", async (req, res) => {
  try {
    await Offre.find({ type: "externe" })
      .sort({ created_at: -1 })
      .populate(["client_id", "ticket_id"])
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//get offres interne type
router.get("/getoffresinterne", async (req, res) => {
  try {
    await Offre.find({ type: "interne" })
      .sort({ created_at: -1 })
      .populate(["client_id", "ticket_id"])
      .then((result) => {
        res.send(result);
        console.log(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// add offre
router.post("/addoffre", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body.ticket });
  ticket.etat = "devis_en_attente_accord_reception_client";
  ticket.etat_garantie = "nn garantie";

  ticket.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log("ticket updated etat");
  });

  Offre.findOne({ ticket_id: req.body.ticket }, function (err, offre) {
    if (offre) {
      piecesderechanges = {
        quantite: req.body.pr.quantite,
        produit: req.body.pr.produit,
        prixunit: req.body.pr.prixpdt,
      };
      const pr = offre.piecesderechanges;
      pr.push(piecesderechanges);

      offre.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "ticket added successfully!" });
      });
    } else {
      const listedespieces = [];
      req.body.pr.forEach((piece, index, array) => {
        const piecederechanges = {
          quantite: piece.newpr.quantite,
          prixunit: piece.newpr.prixunit,
          produit: piece.newpr.produit,
        };
        listedespieces.push(piecederechanges);
      });

      const diagno = new Diagnostic({
        ticket_id: req.body.ticket,
        piecesderechanges: listedespieces,
        etat_garantie: "non garantie",
        pannes: req.body.panne,
        commentaire: req.body.commentaire,
        categorie_id: req.body.categorie,
        article_id: req.body.article,
      });

      diagno.save();

      const offre = new Offre({
        ticket_id: req.body.ticket,
        client_id: req.body.client_id,
        piecesderechanges: listedespieces,
        type: "externe",
        prixmain: req.body.prixmain,
        prix_oeuvre: req.body.prix_oeuvre,
        duree: req.body.duree,
        date_confirmation: req.body.date_confirmation,
        etat_reception: "en attente",
        etat_confirmation: "en attente",
        date_reception: Date.now(),
      });

      offre.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        res.send({ message: "offre added successfully!" });
      });
    }
  });
});

//addoffretypeautre

router.post("/addoffretypeautre", async(req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body.ticket });
  ticket.etat = "devis_en_attente_accord_reception_client";
  ticket.etat_garantie = "nn garantie";

  ticket.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });

  const listedespieces = [];
  req.body.pr.forEach((piece, index, array) => {
    const piecederechanges = {
      quantite: piece.newpr.quantite,
      prixunit: piece.newpr.prixunit,
      produit: piece.newpr.produit,
    };
    listedespieces.push(piecederechanges);
  });

  const offre = new Offre({
    ticket_id: req.body.ticket,
    client_id: req.body.client_id,
    piecesderechanges: listedespieces,
    prixmain: req.body.prixmain,
    prix_oeuvre: req.body.prix_oeuvre,
    duree: req.body.duree,
    date_confirmation: req.body.date_confirmation,
    etat_reception: "en attente",
    etat_confirmation: "en attente",
    date_reception: Date.now(),
    type: "externe",
  });

  offre.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    req.body.listeprs.pr.forEach((pr, index, array) => {
      const stock = new Stock({
        prixunit: pr.pr.prixunit,
        reference: pr.pr.reference,
        marque: pr.pr.libelle,
        produit: pr.pr.produit,
        quantite: pr.pr.quantite,
        type: pr.pr.type,
        emplacement_id: pr.pr.emplacement_id,
      });
      stock.save();

      Emplacement.findOne({ _id: stock.emplacement_id }, function (err, emplacement) {
        pdt = {
          modele: req.body.reference,
          marque: req.body.libelle,
        };

        emplacement.capaciterestante = emplacement.capaciterestante - stock.quantite;
        const emp = emplacement.produits;
        emp.push(pdt);

        emplacement.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
          }

          res.send({ message: "offre added successfully!" });
        });
      });
    });
  });
});

//accept offre
router.put("/acceptoffre", async (req, res) => {
  const offre = await Offre.findOne({ _id: req.body._id });
  const ticket = await Ticket.findOne({ _id: offre.ticket_id });
  ticket.etat = "devis_attente_accord_client_final";
  offre.etat_reception = "confirmé";
  offre.date_reception = Date.now();

  offre.save((err) => {
    if (err) {
      console.log(err);
    }
  });

  ticket.save((err) => {
    if (err) {
      console.log(err);
    }
    console.log("ticket updated");
  });

  let client = Client.findById(req.body.client_id);
  client.then((userDetails) => {
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
      from: '"NextConsult" <nextconsult01@gmail.com>',
      to: userDetails.email,
      subject: "test",
      text: "test",
      html: "<b>vous pouvez accéder à votre compte pour voir les listes des devis</b>",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
    });
  });

  return res.status(200).json({
    title: "offre accepté",
  });
});

//refuser offre
router.put("/refusoffre", async (req, res) => {
  const offre = await Offre.findOne({ _id: req.body._id });
  const ticket = await Ticket.findOne({ _id: offre.ticket_id });
  ticket.etat = "en_attente_pr";
  offre.etat_reception = "refusé";

  offre.save((err) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      title: "offre refusé",
    });
  });

  ticket.save((err) => {
    if (err) {
      console.log(err);
    }
    console.log("ticket updated");
  });
});

module.exports = router;
