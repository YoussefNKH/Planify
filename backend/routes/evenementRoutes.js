const express = require('express');
const router = express.Router();
const EvenementController = require('../controllers/evenementController');
const { checkRole , verifyToken } = require('../middlewares/authMiddleware');

// Créer un événement (pour l'admin)
router.post('/', EvenementController.creeEvenement);

// Obtenir tous les événements 
router.get('/', EvenementController.getEvenements);

// Rechercher des événements en fonction de critères { nom, description, lieu, categorie, statut }
router.get('/recherche', EvenementController.searchEvenements); //body.req changement**

// Obtenir les événements qui sont en cours 
router.get('/actifs', EvenementController.getActiveEvenements);

// Obtenir des événements par la catégorie 
router.get('/categorie/:categorie', EvenementController.getEvenementByCategorie);

// Récupérer les événements complets (billets épuisés) 
router.get('/complets', EvenementController.getFullyBookedEvenements);

// Récupérer les événements par lieu 
router.get('/lieu/:lieu', EvenementController.getEvenementBylieu);

// Récupérer les événements par stade 
router.get('/stade/:stadeId', EvenementController.getEvenementByStade);

// Récupérer les détails d'un événement par ID 
router.get('/:id/details', EvenementController.getEvenementDetails);

// Incrémenter le nombre de billets vendus pour un événement (pour l'admin)
router.patch('/:id/incrementer-billets',verifyToken, checkRole(['admin']), EvenementController.incrementBilletsVendus);

// Récupérer les événements dans une plage de dates 
router.get('/plage-dates', EvenementController.getEvenementsByDateRange);

// Mettre à jour un événement par son ID (pour l'admin)
router.put('/:id', verifyToken,checkRole(['admin']), EvenementController.updateEvenementById);

// Supprimer un événement par son ID (pour l'admin)
router.delete('/:id',verifyToken, checkRole(['admin']), EvenementController.deleteEvenementById);

module.exports = router;
