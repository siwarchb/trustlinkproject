const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  subject: String,

  listetechniciens: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  listemachines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Stock",
    },
  ],
  nb_intervention: String,
  date_debut: Date,
  date_fin: Date,
  color: String,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Even_contrat = mongoose.model("Even_contrat", eventSchema);
module.exports = Even_contrat;
