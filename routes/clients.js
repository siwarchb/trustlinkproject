// Importing necessary modules and models
var express = require("express");
var router = express.Router();
var multer = require('multer');
var path = require('path');
var XLSX = require('xlsx');
var generator = require("generate-password");

const Client = require("../models/Client");
const Client_ticket = require("../models/Client_ticket");
const Ticket = require("../models/Ticket");

// Setting up multer storage for file uploads
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

// Route for importing clients from an uploaded file
router.post("/uploadfile", uploads.single("file"), async (req, res) => {

  // Read the uploaded file
  var workbook = XLSX.readFile(req.file.path);
  var sheet_namelist = workbook.SheetNames;
  var x = 0;

  // Iterate through sheets and insert data into the Client model
  sheet_namelist.forEach(element => {
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
    Client.insertMany(xlData, (err, data) => {
      if (err) {
        console.log(err.message);
        return res.status(200).json({
          title: "error",
        });
      } else {
        console.log('mrigel');
        return res.status(200).json({
          title: "mrigel",
        });
      }
    });
    x++;
  });
});

// Route for editing client information
router.put("/editclient", async (req, res) => {
  const client = await Client.findOne({ _id: req.body._id });
  client.name = req.body.name;
  client.prenom = req.body.prenom;
  client.email = req.body.email;
  client.adresse = req.body.adresse;
  client.telephone = req.body.telephone;

  client.save((err) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json({
      title: "user  modifié",
    });
  });
});

// Route for getting all clients
router.get("/getclients", async (req, res) => {
  try {
    await Client.find().then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route for adding a new client
router.post("/addclient", async (req, res) => {
  var code = generator.generate({
    length: 2,
    numbers: true,
  });

  const client = new Client({
    email: req.body.email,
    name: req.body.name,
    adresse: req.body.adresse,
    telephone: req.body.telephone,
    prenom: req.body.prenom,
    code: req.body.prenom + ' ' + code,
  });

  client.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "client added successfully!" });
  });
});

// Route for getting a client by their ID
router.get("/getclientbyid/:id", async (req, res) => {
  try {
    await Client.findOne({ _id: req.params.id }).then((result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
  }
});

// Route for checking if an email exists in the Client table
router.get("/getemail/:mail", async (req, res) => {
  try {
    await Client.findOne({ email: req.params.mail }).then((result) => {
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

// Route for deleting a client
router.delete("/deleteclient/:id", async (req, res) => {
  try {
    // Delete related client_ticket documents first
    await Client_ticket.deleteMany({ client_id: req.params.id });
    await Ticket.deleteMany({ client_id: req.params.id });

    // Then, delete the client
    await Client.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "Client supprimé",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Exporting the router
module.exports = router;
