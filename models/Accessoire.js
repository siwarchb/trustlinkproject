const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccessoireSchema = new Schema({
  reference: String,
  libelle: { unique: true,
    type: String},
  produit: String,


created_at    : { type: Date,  default: Date.now },
updated_at    : { type: Date, default: Date.now }
})


const accessoire = mongoose.model('Accessoire', AccessoireSchema);
module.exports = accessoire;