const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    utilisateur:
    { // Référence à l'utilisateur qui a effectué la réservation
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Utilisateur',
          required: true
    }, 
    evenement: 
    { // Référence à l'événement réservé
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evenement',
        required: true 
    }, 
    nbr_tickets:
    { // Nombre de billets réservés
        type: Number,
         required: true
    }, 
    prixTotal:
    { // Prix total de la réservation
        type: Number,
         required: true
    }, 
    statut:
    { // Statut de la réservation
      type: String,
      enum: ['en attente', 'payée', 'annulée'], 
      default: 'en attente' 
    }, 
  }, { timestamps: true });
  
  const Reservation = mongoose.model('Reservation', reservationSchema);
  
  module.exports = Reservation;