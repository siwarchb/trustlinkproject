const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const randomColor = require('randomcolor');

const contratSchema = new Schema({
  
  
  
  Reference : String,

  listetechniciens:[{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  client_id:{
    type: Schema.Types.ObjectId,
    ref: "Client",
  },
  listemachines: [
    {
      type: Schema.Types.ObjectId,
    ref: "Stock",
      
    },
  ],
  nb_intervention : String,
  date_debut:Date,
  date_fin:Date,



 
created_at    : { type: Date,  default: Date.now },
updated_at    : { type: Date, default: Date.now }
})


const Contrat = mongoose.model('contrat', contratSchema);
module.exports = Contrat;