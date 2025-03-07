const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  numero:
   { // Numéro unique du billet
    type: String, 
    required: true, 
    unique: true 
}, 
  evenement:
   {// Référence à l'événement
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Evenement', 
     required: true 
    }, 
  utilisateur:
   {// Référence à l'utilisateur
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Utilisateur', 
     required: true 
    }, 
  dateEmission:
   { // Date d'émission du billet
    type: Date, 
    default: Date.now 
    }, 
  statut: 
   { 
    type: String, 
    enum: ['valide', 'utilisé', 'annulé'], // Statut du billet
    default: 'valide' 
    },
  prix:
   { 
    type: Number, 
    required: true 
    } // Prix du billet
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
