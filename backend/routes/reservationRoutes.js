const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservationController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
//Creer une reservation
router.post('/',ReservationController.creeReservation);
router.post('/:reservationId/pay',ReservationController.payementDeReservation);
// Get tous les reservations
router.get('/',verifyToken,checkRole(['admin']), ReservationController.getReservations);

// Get les reservations avec l'id du l'utilisateur 
router.get('/utilisateur/:utilisateurId', ReservationController.getReservationsByUtilisateur);

// Get les reservations avec l' id de l'evenement
router.get('/utilisateur/:evenementId', ReservationController.getReservationsByEvenement);
//Get mise a jour du reservation
router.put('/:id', ReservationController.updateReservation);
router.delete('/:id',verifyToken,checkRole(['admin']),ReservationController.deleteReservation)

module.exports = router;
