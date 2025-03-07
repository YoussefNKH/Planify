const mongoose = require('mongoose');

const stadeSchema = new mongoose.Schema({
  nom:
   {
     type: String,
      required: true 
    },
  capacite:
   {
     type: Number,
      required: true 
    },
  adresse:
   {
     type: String,
      required: true
     },
  ville:
   {
     type: String,
      required: true 
    },
  image: {
     type: String
     }, // Optional
}, { timestamps: true });

const Stade = mongoose.model('Stade', stadeSchema);

module.exports = Stade;