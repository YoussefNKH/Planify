const express = require('express');
const router = express.Router();
const TicketController = require('../controllers/ticketController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
// Récupérer tous les tickets
router.get('/', verifyToken,checkRole(['admin']),TicketController.getTickets);

// Récupérer un ticket par son numéro
router.get('/numero/:numero',verifyToken,checkRole(['admin']), TicketController.getTicketByNum);

// Récupérer des tickets par utilisateur
router.get('/utilisateur/:utilisateur', TicketController.getTicketByUtilisateur);

// Mettre à jour un ticket par son ID
router.put('/:id',verifyToken,checkRole(['admin']) ,TicketController.updateTicketById);

// Supprimer un ticket par son ID
router.delete('/:id', verifyToken,checkRole(['admin']),TicketController.deleteTicketById);

module.exports = router;
