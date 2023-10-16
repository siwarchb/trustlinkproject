const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  numero: String,
  revendeur: String,
  datefacture: Date,

  numerofacture: String,
  typeproduit: String,

  marqueappareil: String,
  modeleappareil: String,
  etat_garantie: String,
  etat: String,

  typerevendeur: String,
  datereception: Date,
  numlotounumserie: String,
  statutaffectation: String,
  livreur: String,
  representant: String,
  affectépar: String,
  accessoires: { type: Array },
  pannesreclames: String,
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
