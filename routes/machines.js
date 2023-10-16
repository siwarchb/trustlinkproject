var express = require("express");
var router = express.Router();
var multer = require('multer');
var path = require('path');
var XLSX = require('xlsx');
var generator = require("generate-password");
const Stock = require("../models/Stock");
const Machine = require("../models/Machine");
const Emplacement = require("../models/Emplacement");

// Route to get all machines
router.get("/getmachines", async (req, res) => {
    try {
        await Machine.find().then((result) => {
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
});

// Route to edit machine
router.put("/editmachine", async (req, res) => {
    const machine = await Machine.findOne({ _id: req.body._id });
    (machine.modele = req.body.name),
        (machine.marque = req.body.prenom),
        (machine.emplacement = req.body.emplacement),
        (machine.type = "piece de rechange")

    machine.save((err) => {
        if (err) {
            console.log(err);
        }
        return res.status(200).json({
            title: "user  modifié",
        });
    });
});

// Route to add a machine
router.post("/addmachine", async (req, res) => {
    // Extracting request data
    let machine;
    switch (req.body.type) {
        case "Voiture":
            machine = new Machine({
                marque: req.body.marque,
                modele: req.body.modele,
                emplacement_id: req.body.emplacement_id,
                type: req.body.type,
                categorie: req.body.categorie,
                anneefabrication: req.body.anneefabrication,
                typecarburant: req.body.typecarburant,
                puissance: req.body.puissance,
                numerochassis: req.body.numerochassis,
                datevidange: req.body.datevidange,
                dateassurance: req.body.dateassurance,
                datevisitetechnique: req.body.datevisitetechnique,
            });
            break;

        case "Camion":
            machine = new Machine({
                marque: req.body.marque,
                modele: req.body.modele,
                emplacement_id: req.body.emplacement_id,
                type: req.body.type,
                categorie: req.body.categorie,
                anneefabrication: req.body.anneefabrication,
                typecarburant: req.body.typecarburant,
                puissance: req.body.puissance,
                numerochassis: req.body.numerochassis,
                datevidange: req.body.datevidange,
                dateassurance: req.body.dateassurance,
                datevisitetechnique: req.body.datevisitetechnique,
                matricule: req.body.matricule,
                kilometrage: req.body.kilometrage,
                capacite: req.body.capacite,
                datevignette: req.body.datevignette,
            });
            break;

        case "aspirateur":
            machine = new Machine({
                marque: req.body.marque,
                modele: req.body.modele,
                emplacement_id: req.body.emplacement_id,
                type: req.body.type,
                categorie: req.body.categorie,
                typeaspirateur: req.body.typeaspirateur,
                puissanceaspirateur: req.body.puissanceaspirateur,
                capaciteaspirateur: req.body.capaciteaspirateur,
            });
            break;

        case "cafitiére":
            machine = new Machine({
                marque: req.body.marque,
                modele: req.body.modele,
                emplacement_id: req.body.emplacement_id,
                type: req.body.type,
                categorie: req.body.categorie,
                capacitecafitiere: req.body.capacitecafitiere,
                filtrationcafitiere: req.body.filtrationcafitiere,
                puissancecafitiere: req.body.puissancecafitiere
            });
            break;

        case "Réfrigirateur":
            machine = new Machine({
                marque: req.body.marque,
                modele: req.body.modele,
                emplacement_id: req.body.emplacement_id,
                type: req.body.type,
                categorie: req.body.categorie,
                capaciterefrigidaire: req.body.capaciterefrigidaire,
                classerefrigidaire: req.body.classerefrigidaire,
                poidsrefrigidaire: req.body.poidsrefrigidaire,
                typerefrigidaire: req.body.typerefrigidaire,
            });
            break;

        case "machine à laver":
            machine = new Machine({
                marque: req.body.marque,
                modele: req.body.modele,
                emplacement_id: req.body.emplacement_id,
                type: req.body.type,
                categorie: req.body.categorie,
                capacitemachine: req.body.capacitemachine,
                vitessemachine: req.body.vitessemachine,
                classemachine: req.body.classemachine,
            });
            break;

        case "climatiseur":
            machine = new Machine({
                marque: req.body.marque,
                modele: req.body.modele,
                emplacement_id: req.body.emplacement_id,
                type: req.body.type,
                categorie: req.body.categorie,
                capaciterefroidissement: req.body.capaciterefroidissement,
                puissanceclimatiseur: req.body.puissanceclimatiseur,
                classeclimatiseur: req.body.classeclimatiseur,
            });
            break;
    }

    const stock = new Stock({
        reference: req.body.modele,
        marque: req.body.marque,
        emplacement_id: req.body.emplacement_id,
        type: "produit",
        quantite: 1,
    });

    machine.save((err) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        res.send({ message: "machine added successfully!" });
    });

      stock.save((err) => {
        if (err) {
            console.log("error");
        }
        console.log("successfully created ");
    });
});

// Route to delete a machine
router.delete("/deletemachine/:id", async (req, res) => {
    const machine = await Machine.findOne({ _id: req.params.id });
    Stock.deleteOne({ reference: machine.modele })
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
    Machine.deleteOne({ _id: req.params.id })
        .then((result1) => {
            console.log("stock deleted");
        })
        .catch((err) => {
            console.log("error stock deleted");
        });
});

module.exports = router;
