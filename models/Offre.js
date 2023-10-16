const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offreSchema = new Schema({
  prix_oeuvre: String,
  prixmain: String,
  duree: String,
  date_confirmation: String,
  date_reception: Date,
  ticket_id: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
  },
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  piecesderechanges: [
    {
      quantite: String,
      produit: String,
      prixunit: String,
    },
  ],
  etat_reception: String,
  etat_confirmation: String,
  type: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Offre = mongoose.model("Offre", offreSchema);
module.exports = Offre;
