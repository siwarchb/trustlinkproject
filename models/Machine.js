const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MachineSchema = new Schema({
  modele: String,
  marque: String,
  emplacement_id: {
    type: Schema.Types.ObjectId,
    ref: "Emplacement",
  },
  type: String,
  categorie: String,
  anneefabrication: String,
  typecarburant: String,
  puissance: String,
  typecarburant: String,
  numerochassis: String,
  datevidange: Date,
  dateassurance: Date,
  datevisitetechnique: Date,
  datevignette: Date,
  kilometrage: String,
  capacite: String,
  typeaspirateur: String,
  puissanceaspirateur: String,
  capaciteaspirateur: String,
  typecafitiere: String,
  capacitecafitiere: String,
  filtrationcafitiere: String,
  puissancecafitiere: String,
  capaciterefrigidaire: String,
  classerefrigidaire: String,
  poidsrefrigidaire: String,
  typerefrigidaire: String,
  capacitemachine: String,
  vitessemachine: String,
  classemachine: String,
  capaciterefroidissement: String,
  puissanceclimatiseur: String,
  classeclimatiseur: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Machine = mongoose.model("Machine", MachineSchema);
module.exports = Machine;
