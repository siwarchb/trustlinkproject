const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const revendeurSchema = new Schema({
  nom: String,
  prenom: String,
  email: {
    unique: true,
    type: String,
  },
  type: String,
  telephone: String,
  adresse: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Revendeur = mongoose.model("Revendeur", revendeurSchema);
module.exports = Revendeur;
