const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  reference: String,
  marque: String,
  prixunit: String,
  emplacement_id: {
    type: Schema.Types.ObjectId,
    ref: "Emplacement",
  },
  type: String,
  produit: String,
  quantite: Number,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const stock = mongoose.model("Stock", StockSchema);
module.exports = stock;
