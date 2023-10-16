const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const client_ticketSchema = new Schema({
  tickets: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  client_id: {
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  datereception: Date,

  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Client_ticket = mongoose.model("Client_ticket", client_ticketSchema);
module.exports = Client_ticket;
