const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interventionSchema = new Schema({
  Reference: String,

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

  date: Date,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Intervention = mongoose.model("Intervention", interventionSchema);
module.exports = Intervention;
