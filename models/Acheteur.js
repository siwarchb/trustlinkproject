const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const acheteurSchema = new Schema({
  nom: String,
  prenom: String,
  email: {
    unique: true,
    type: String
  },
  telephone: String,

created_at    : { type: Date,  default: Date.now },
updated_at    : { type: Date, default: Date.now }
})


const Acheteur = mongoose.model('Acheteur', acheteurSchema);
module.exports = Acheteur;