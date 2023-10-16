var express = require("express");
const Emplacement = require("../models/Emplacement");
var router = express.Router();
const Ticket = require("../models/Ticket");
const Client_ticket = require("../models/Client_ticket");
const Client = require("../models/Client");
const Diagnostic = require("../models/Diagnostic");

const Stock = require("../models/Stock");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const emails = require("email-generator");

var generator = require("generate-password");
var nodeMailer = require("nodemailer");
//get all tickets length

//get all clients by their tickets
router.get("/getticket", async (req, res) => {
  try {
    await Client_ticket.find({})
      .sort({ created_at: -1 })
      .populate(["client_id", "tickets"])

      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//get one ticket
router.get("/getticketbyid/:id", async (req, res) => {
  try {
    await Client_ticket.findOne({ _id: req.params.id })
      .populate(["client_id", "tickets"])

      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//get one ticket and her diagnostics
router.get("/getdiagnosticbyticket/:id", async (req, res) => {
  try {
    await Diagnostic.findOne({ ticket_id: req.params.id })
      .populate(["ticket_id"])

      .then((result) => {
        res.send(result);
        console.log(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// exist mail from table user

router.get("/getemail/:mail", async (req, res) => {
  try {
    await User.findOne({ email: req.params.mail })
    .then((result) => {
      console.log(result);

      if (result) {
        res.send("adresse mail existe");
      } else {
        res.send("null");
      }
    });
  } catch (err) {
    res.send("null");
  }
});

// get one ticket in module diagnostics
router.get("/getticketsbyid/:id", async (req, res) => {
  try {
    await Ticket.findOne({ _id: req.params.id })
      .populate(["client_id"])

      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

// get one ticket in rapport
router.get("/getrapportbyticket/:id", async (req, res) => {
  try {
    await Ticket.findOne({ _id: req.params.id })
      .populate(["client_id"])

      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//get tickets by clientt

router.get("/getticketbyclient/:id", async (req, res) => {
  try {
    await Client_ticket.find({ _id: req.params._id }).then((result) => {
      // res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// get all tickets in diagnostics module
router.get("/getalltickets", async (req, res) => {
  try {
    await Ticket.find()
      .sort({ created_at: -1 })
      .then((result) => {
        console.log(result);
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});

//add multi ticket by client and store everything
router.post("/addmultiticket", async (req, res) => {
  // test client if exist
  let resultquery = "";
  let resultquery2 = "";

  try {
    await Client.findOne({ email: req.body.client.email }).then((result) => {
      resultquery = result;
    });
  } catch (err) {
    console.log(err);
  }

  // if does not exist
  if (resultquery == null) {
    const client = new Client({
      email: req.body.client.email,
      name: req.body.client.name,
      adresse: req.body.client.adresse,
      telephone: req.body.client.telephone,
      prenom: req.body.client.prenom,
      code: "",
    });

    var clientCount; // Variable to store the count of clients

    // Count the number of clients
    Client.countDocuments().then((count) => {
      clientCount = count; // Assign the count value to the variable
      console.log(`Number of clients: ${clientCount}`);

      if (clientCount === 0) {
        console.log("Number is zero");
        const clientName = req.body.client.name;
        const newCode = `${clientName} ${1}`;
        client.code = newCode;
        return client.save(); // Return the save operation
      } else {
        console.log("Number is not zero");
        const clientName = req.body.client.name;
        const incrementClient = parseInt(clientCount + 1);
        console.log(clientCount);
        const newCode = `${clientName} ${incrementClient}`;
        client.code = newCode;
        return client.save(); // Return the save operation
      }
    });

    const listickets = [];
    let datereception = "";

    // create multi ticket in table ticket
    req.body.tickets.forEach((ticket, index, array) => {
      // save ticket i table
      const newticket = new Ticket({
        numero: ticket.ticket.numeroticket,
        revendeur: ticket.ticket.revendeur,
        datefacture: ticket.ticket.datefacture,
        numerofacture: ticket.ticket.numerofacture,
        marqueappareil: ticket.ticket.marqueappareil,
        modeleappareil: ticket.ticket.modeleappareil,
        etat_garantie: ticket.ticket.etat_garantie,
        typeproduit: ticket.ticket.typeproduit,
        etat: ticket.ticket.etat,
        datereception: ticket.ticket.datereception,
        affectépar: ticket.ticket.affectepar,
        statutaffectation: ticket.ticket.statutaffectation,
        livreur: ticket.ticket.livreur,
        representant: ticket.ticket.representant,
        typerevendeur: ticket.ticket.typerevendeur,
        numlotounumserie: ticket.ticket.numlotounumserie,
        client_id: client._id,
        accessoires: ticket.ticket.accessoires,
        pannesreclames: ticket.ticket.pannesreclames,
      });
      newticket.save();
      datereception = newticket.datereception;

      listickets.push(newticket);

      //add product to emplacement
      Emplacement.findOne({ type: "Réception" }, function (err, emplacement) {
        pdt = {
          modele: ticket.ticket.modeleappareil,
          marque: ticket.ticket.marqueappareil,
        };
        const emp = emplacement.produits;
        emp.push(pdt);

        emplacement.save((err) => {
          if (err) {
            console.log(err);
          }
          console.log("emplacement added");
        });

        //add stock
        const stock = new Stock({
          reference: ticket.ticket.modeleappareil,
          marque: ticket.ticket.marqueappareil,
          emplacement_id: emplacement._id,
          type: "produit",
          quantite: 1,
          produit: null,
        });

        stock.save((err) => {
          if (err) {
            console.log(err);
          }

          console.log("stock added");
        });
      });
    });

    // create clientticket table
    try {
      Client_ticket.findOne({ client_id: client._id }).then((result) => {
        resultquery2 = result;

        const client_ticket = new Client_ticket({
          client_id: client._id,
          tickets: listickets,
          datereception: datereception,
        });
        client_ticket.save();
      });
    } catch (err) {
      console.log(err);
    }

    let adresse = req.body.client.email;

    // generate password for client
    var password = generator.generate({
      length: 8,
      numbers: true,
    });

    User.findOne({ email: req.body.client.email }).then((result) => {
      if (result == null) {
        const user = new User({
          email: req.body.client.email,
          name: req.body.client.name,
          password: bcrypt.hashSync(password, 10),
          passwordtext: password,
          adresse: req.body.client.adresse,
          telephone: req.body.client.telephone,
          role: "client",
        });

        user.save();

        // send login for client by his adress
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
          subject: "login", // Subject line
          text: "login cordonnées", // plain text body
          html:
            "<b>vous pouvez accéder à votre compte client à travers votre adresse mail :" +
            adresse +
            "et votre mot de passe  </b>" +
            password +
            "<b> merci de nous rejoindre  </b>", // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          console.log("Message %s sent: %s");
        });

        res.redirect("/ticket");
      } else {
        res.redirect("/ticket");
      }
    });
  } else {
    //if exist

    let datereception = "";
    const listicketts = [];

    req.body.tickets.forEach((ticket, index, array) => {
      const newticket = new Ticket({
        numero: ticket.ticket.numeroticket,
        revendeur: ticket.ticket.revendeur,
        datefacture: ticket.ticket.datefacture,
        numerofacture: ticket.ticket.numerofacture,
        marqueappareil: ticket.ticket.marqueappareil,
        modeleappareil: ticket.ticket.modeleappareil,
        etat_garantie: ticket.ticket.etat_garantie,
        typeproduit: ticket.ticket.typeproduit,
        etat: ticket.ticket.etat,
        datereception: ticket.ticket.datereception,
        affectépar: ticket.ticket.affectepar,
        statutaffectation: ticket.ticket.statutaffectation,
        livreur: ticket.ticket.livreur,
        representant: ticket.ticket.representant,
        typerevendeur: ticket.ticket.typerevendeur,
        numlotounumserie: ticket.ticket.numlotounumserie,
        client_id: resultquery._id,
        accessoires: ticket.ticket.accessoires,
        pannesreclames: ticket.ticket.pannesreclames,
      });

      newticket.save();
      listicketts.push(newticket);
      datereception = newticket.datereception;

      //add product to emplacement
      Emplacement.findOne({ type: "Réception" }, function (err, emplacement) {
        pdt = {
          modele: ticket.ticket.modeleappareil,
          marque: ticket.ticket.marqueappareil,
        };
        console.log(pdt);

        const emp = emplacement.produits;
        emp.push(pdt);

        emplacement.save();

        const stock = new Stock({
          reference: ticket.ticket.modeleappareil,
          marque: ticket.ticket.marqueappareil,
          emplacement_id: emplacement._id,
          type: "produit",
          quantite: 1,
        });

        stock.save();
      });
    });

    try {
      const client_id = resultquery._id;

      const client_ticket = new Client_ticket({
        tickets: listicketts,
        client_id: client_id,
        datereception: datereception,
      });

      client_ticket.save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("ticket_client ajouté");
      });
    } catch (err) {
      console.log(err);
    }

    let adresse = req.body.client.email;

    // generate password for client
    var password = generator.generate({
      length: 8,
      numbers: true,
    });

    User.findOne({ email: req.body.client.email }).then((result) => {
      if (result == null) {
        const user = new User({
          email: req.body.client.email,
          name: req.body.client.name,
          password: bcrypt.hashSync(password, 10),
          passwordtext: password,
          adresse: req.body.client.adresse,
          telephone: req.body.client.telephone,
          role: "client",
        });

        user.save();

        // send login for client by his adress
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
          subject: "login", // Subject line
          text: "login cordonnées", // plain text body
          html:
            "<b>vous pouvez accéder à votre compte client à travers votre adresse mail :" +
            adresse +
            "et votre mot de passe  </b>" +
            password +
            "<b> merci de nous rejoindre  </b>", // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
          console.log("Message %s sent: %s");
        });

        res.redirect("/ticket");
      } else {
        res.redirect("/ticket");
      }
    });
  }
});

// add ticket (only one and store everything)
router.post("/addticket", async (req, res) => {
  const resultquery = "";
  try {
    await Client.findOne({ email: req.body.client.email }).then((result) => {
      this.resultquery = result;
    });
  } catch (err) {
    console.log(err);
  }

  if (this.resultquery == null) {
    const client = new Client({
      email: req.body.client.email,
      name: req.body.client.name,
      adresse: req.body.client.adresse,
      telephone: req.body.client.telephone,
      prenom: req.body.client.prenom,
    });

    client.save((err) => {
      if (err) {
        console.log(err);
      }
      console.log("client ajouté");

      const ticket = new Ticket({
        numero: req.body.ticket.numero,
        revendeur: req.body.ticket.revendeur,
        datefacture: req.body.ticket.datefacture,
        numerofacture: req.body.ticket.numerofacture,
        marqueappareil: req.body.ticket.marqueappareil,
        modeleappareil: req.body.ticket.modeleappareil,
        etat_garantie: req.body.ticket.etat_garantie,
        typeproduit: req.body.ticket.typeproduit,
        etat: req.body.ticket.etat,
        datereception: req.body.ticket.datereception,
        affectépar: req.body.ticket.affectepar,
        statutaffectation: req.body.ticket.statutaffectation,
        livreur: req.body.ticket.livreur,
        representant: req.body.ticket.representant,
        typerevendeur: req.body.ticket.typerevendeur,
        numlotounumserie: req.body.ticket.numlotounumserie,
        client_id: client._id,
        accessoires: req.body.accessoires,
        pannesreclames: req.body.pannesreclames,
      });

      ticket.save((err) => {
        if (err) {
          console.log(err);
        }
        res.redirect("/ticket");
      });
      const datereception = req.body.ticket.datereception;

      const client_ticket = new Client_ticket({
        tickets: ticket,
        client_id: client._id,
        datereception: datereception,
      });

      client_ticket.save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("ticket_client ajouté");
      });
    });
  } else {
    const ticket = new Ticket({
      numero: req.body.ticket.numero,
      revendeur: req.body.ticket.revendeur,
      datefacture: req.body.ticket.datefacture,
      numerofacture: req.body.ticket.numerofacture,
      marqueappareil: req.body.ticket.marqueappareil,
      modeleappareil: req.body.ticket.modeleappareil,
      etat_garantie: req.body.ticket.etat_garantie,
      typeproduit: req.body.ticket.typeproduit,
      etat: req.body.ticket.etat,
      datereception: req.body.ticket.datereception,
      affectépar: req.body.ticket.affectepar,
      statutaffectation: req.body.ticket.statutaffectation,
      livreur: req.body.ticket.livreur,
      representant: req.body.ticket.representant,
      typerevendeur: req.body.ticket.typerevendeur,
      numlotounumserie: req.body.ticket.numlotounumserie,
      client_id: this.resultquery._id,
      accessoires: req.body.accessoires,
      pannesreclames: req.body.pannesreclames,
    });

    ticket.save((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/ticket");
    });

    try {
      const client_id = this.resultquery._id;
      const datereception = req.body.ticket.datereception;

      const client_ticket = new Client_ticket({
        tickets: ticket,
        client_id: client_id,
        datereception: datereception,
      });

      client_ticket.save((err) => {
        if (err) {
          console.log(err);
        }
        console.log("ticket_client ajouté");
      });
    } catch (err) {
      console.log(err);
    }
  }

  let adresse = req.body.client.email;

  // generate password for client
  var password = generator.generate({
    length: 8,
    numbers: true,
  });

  // send login for client by his adress

  User.findOne({ email: req.body.client.email }).then((result) => {
    if (result == null) {
      const user = new User({
        email: req.body.client.email,
        name: req.body.client.name,
        password: bcrypt.hashSync(password, 10),
        passwordtext: password,
        adresse: req.body.client.adresse,
        telephone: req.body.client.telephone,
        role: "client",
      });

      user.save();

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
        subject: "login", // Subject line
        text: "login cordonnées", // plain text body
        html:
          "<b>vous pouvez accéder à votre compte client à travers votre adresse mail :" +
          adresse +
          "et votre mot de passe  </b>" +
          password +
          "<b> merci de nous rejoindre  </b>", // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
        console.log("Message %s sent: %s");
      });
    } else {
      console.log("user exist");
    }
  });

  //add product to emplacement
  Emplacement.findOne({ type: "Réception" }, function (err, emplacement) {
    pdt = {
      modele: req.body.ticket.modeleappareil,
      marque: req.body.ticket.marqueappareil,
    };
    const emp = emplacement.produits;
    emp.push(pdt);

    emplacement.save((err) => {
      if (err) {
        console.log(err);
      }

      console.log("emplacement added");
    });

    console.log("hii stock");
    //add stock
    const stock = new Stock({
      reference: req.body.ticket.modeleappareil,
      marque: req.body.ticket.marqueappareil,
      emplacement_id: emplacement._id,
      type: "produit",
      quantite: 1,
      produit: null,
    });

    stock.save((err) => {
      if (err) {
        console.log(err);
      }

      console.log("stock added");
    });
  });
});

//update ticket

router.put("/updateticket", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body._id });
  (ticket.numero = req.body.numero),
    (ticket.revendeur = req.body.revendeur),
    (ticket.datefacture = req.body.datefacture),
    (ticket.numerofacture = req.body.numerofacture),
    (ticket.typeproduit = req.body.typeproduit),
    (ticket.marqueappareil = req.body.marqueappareil),
    (ticket.modeleappareil = req.body.modeleappareil),
    (ticket.etat_garantie = req.body.etat_garantie),
    (ticket.numlotounumserie = req.body.numlotounumserie),
    (ticket.representant = req.body.representant),
    (ticket.livreur = req.body.livreur),
    (ticket.datereception = req.body.datereception),
    (ticket.typerevendeur = req.body.typerevendeur),
    (ticket.etat = req.body.etat),
    ticket.save();
  const client = await Client.findOne({ email: req.body.email });
  (client.name = req.body.name),
    (client.prenom = req.body.prenom),
    (client.email = req.body.email),
    (client.adresse = req.body.adresse),
    (client.telephone = req.body.telephone),
    client.save((err) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        title: "ticket  modifié",
      });
    });
});

//affceter tech au ticket

router.put("/updateticketechnicien", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body._id });
  (ticket.affectépar = req.body.affectépar),
    ticket.save((err) => {
      if (err) {
        console.log("err");
      }
      return res.status(200).json({
        title: "ticket  affecté au technicien",
      });
    });
});

router.put("/updatedevisfactur", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body._id });
  (ticket.etat = "réparation en cours"),
    ticket.save((err) => {
      if (err) {
        console.log("err");
      }
      return res.status(200).json({
        title: "devis  facturé",
      });
    });
});

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

//update garantie ticket

router.put("/updategarantieticket", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body._id });
  (ticket.etat_garantie = req.body.garantie),
    (ticket.etat = "Traité"),
    ticket.save((err) => {
      if (err) {
        console.log("err");
      }
      return res.status(200).json({
        title: "ticket  diagnostiqué",
      });
    });
});

router.delete("/deleteticket/:id", (req, res, next) => {
  Ticket.findOne({ _id: req.params.id }).then((result) => {
    const reference = result.modeleappareil;
    //find stock lié au ticket
    Stock.findOne({ reference: reference }).then((stock) => {
      //find emplacement  lié au stock
      Emplacement.findOne({ _id: stock.emplacement_id }).then((emplacement) => {
        const listeproduits = emplacement.produits;
        const object = listeproduits.findIndex(
          ({ modele }) => modele === result.modeleappareil
        );
        //delete stock and save from emplacement
        listeproduits.splice(object);
        emplacement.save();
      });

      Stock.deleteOne({ reference: reference })
        .then((stock) => {
          res.status(200).json({});
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    });

    Ticket.deleteOne({ _id: req.params.id })
      .then((result1) => {
        res.status(200).json({
          message: "ticket supprimé",
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

//get  tickets technicien
router.get("/gettickettechnicien/:id", async (req, res) => {
  try {
    await Ticket.find({
      $or: [
        {
          affectépar: req.params.id,
        },
        {
          affectépar: "",
        },
      ],
    })
      .populate(["client_id"])
      .sort({ created_at: -1 })
      .then((result) => {
        res.send(result);
      });
  } catch (err) {
    console.log(err);
  }
});
///
router.get("/gettickettechniciens/:id", async (req, res) => {
  try {
    await Ticket.find({ affectépar: req.params.id }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

/////take ticket
router.put("/taketicket", async (req, res) => {
  const ticket = await Ticket.findOne({ _id: req.body.id });
  (ticket.affectépar = req.body.technicien_id),
    ticket.save((err) => {
      if (err) {
        console.log(err);
      }
      return res.status(200).json({
        title: "ticket  modifié",
      });
    });
});

//delete ticket by numero

router.delete("/deleteticketbynumero/:id", async (req, res) => {
  Ticket.deleteOne({ numero: req.params.id })
    .then((result1) => {
      res.status(200).json({
        message: "ticket supprimé",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// count nb tickets

router.get("/counticket", (req, res) => {
  Ticket.count({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/counticketencours", (req, res) => {
  Ticket.count({ etat: "en cours" }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/counticketenreparation", (req, res) => {
  Ticket.count({ etat: "réparation en cours" }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
router.get("/counticketenreparationgarantie", (req, res) => {
  Ticket.count(
    {
      $and: [
        {
          etat: "réparation en cours",
        },
        {
          etat_garantie: "garantie",
        },
      ],
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.get("/counticketenreparationhorsgarantie", (req, res) => {
  Ticket.count(
    {
      $and: [
        {
          etat: "réparation en cours",
        },
        {
          etat_garantie: "hors garantie",
        },
      ],
    },
    function (err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    }
  );
});
router.get("/counticketouvert", (req, res) => {
  Ticket.count({ etat: "ouverte" }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});
router.get("/counticketcloture", (req, res) => {
  Ticket.count({ etat: "clotureetdechargerecu" }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

router.get("/counticketrepare", (req, res) => {
  Ticket.count({ etat: "reparation termine" }, function (err, result) {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.json(result);
      console.log(err);
    }
  });
});

//  get all types

router.get("/counticketsbytypeclient", async (req, res) => {
  const data1 = await Ticket.aggregate().sortByCount("typerevendeur");

  res.send(data1);
});

router.get("/counticketsbymarquepdt", async (req, res) => {
  const data1 = await Ticket.aggregate().sortByCount("marqueappareil");

  res.send(data1);
  console.log(data1);
});

module.exports = router;
