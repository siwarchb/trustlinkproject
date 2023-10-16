const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiagnosticSchema = new Schema({
  ticket_id: {
    type: Schema.Types.ObjectId,
    ref: "Ticket",
  },

  piecesderechanges: [
    {
      quantite: String,
      produit: String,
      prixunit: String,
    },
  ],
  pannes: { type: Array },

  etat_garantie: String,
  commentaire: String,

  categorie_id: {
    type: Schema.Types.ObjectId,
    ref: "Categorie",
  },
  article_id: {
    type: Schema.Types.ObjectId,
    ref: "Article",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Diagnostic = mongoose.model("Diagnostic", DiagnosticSchema);
module.exports = Diagnostic;
