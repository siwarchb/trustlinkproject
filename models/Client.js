const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  name: String,
  prenom: String,
  email: {
    unique: true,
    type: String,
  },
  code: {
    unique: true,
    type: String,
  },
  telephone: String,
  adresse: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
