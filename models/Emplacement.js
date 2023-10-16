const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmplacementSchema = new Schema({
  nom: String,
  code: String,
  capacite: Number,
  capaciterestante: Number,

  produits: [
    {
      marque: String,
      modele: String,
    },
  ],
  type: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Emplacement = mongoose.model("Emplacement", EmplacementSchema);
module.exports = Emplacement;
