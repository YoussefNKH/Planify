const express = require('express');
const router = express.Router();
const StadeController = require('../controllers/stadeController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Créer un stade
router.post('/',verifyToken,checkRole(['admin']), StadeController.creeStade);

// Récupérer tous les stades
router.get('/', StadeController.getStades);

// Récupérer un stade par ID
router.get('/:id', StadeController.getStadesById);

// Récupérer des stades par nom
router.get('/nom', StadeController.getStadesBynom);

// Récupérer des stades par ville
router.get('/ville', StadeController.getStadesByVille);

// Mettre à jour un stade par ID
router.put('/:id',verifyToken,checkRole(['admin']), StadeController.updateStadeById);

// Supprimer un stade par ID
router.delete('/:id',verifyToken,checkRole(['admin']), StadeController.deleteStadeById);

module.exports = router;
