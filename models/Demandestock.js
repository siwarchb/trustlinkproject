const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DemandestockSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  produit: String,
  marque: String,

  etat: String,

  quantite: Number,
  prixunitaire: Number,

  ticket_id: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
  },

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const demandestock = mongoose.model("Demandestock", DemandestockSchema);
module.exports = demandestock;
