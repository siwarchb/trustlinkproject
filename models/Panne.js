const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PanneSchema = new Schema({
  name: String,
  article: String,
  groupe: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Panne = mongoose.model("Panne", PanneSchema);
module.exports = Panne;
