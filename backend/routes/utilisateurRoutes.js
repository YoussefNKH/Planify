const express = require('express');
const router = express.Router();
const UtilisateurController = require('../controllers/utilisateurController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');
// Créer un utilisateur
router.post('/register', UtilisateurController.creeUtilisateur);

//
router.post('/login', UtilisateurController.authentification);

// Obtenir tous les utilisateurs
router.get('/',verifyToken,checkRole(['admin']), UtilisateurController.getUtilisateurs);

// Obtenir un utilisateur par ID
router.get('/:id',verifyToken ,checkRole(['admin','user']),UtilisateurController.getUtilisateurById);

// Obtenir un utilisateur par adresse e-mail
router.get('/email/:address_mail',verifyToken,checkRole(['admin']), UtilisateurController.getUtilisateursByAdr);

// Mettre à jour un utilisateur par ID
router.put('/:id', verifyToken, checkRole(['admin']), UtilisateurController.updateUtilisateurById);

// Supprimer un utilisateur par ID
router.delete('/:id',verifyToken, checkRole(['admin']), UtilisateurController.deleteUtilisateurById);
module.exports = router;