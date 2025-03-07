const Utilisateur = require('../models/utilisateur.model');
const {hashagePassword,verifierPassword,genererToken}=require('../utils/auth');
const creeUtilisateur = async (req,res) => {
    try {
        const {nom,address_mail,mot_de_passe,role} = req.body;
        //creation d'une instance Utilisateur et sauvegarder dans le db
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(address_mail)) {
            return res.status(400).json({ message: "Adresse e-mail invalide." });
        }
        const utilisateurEX = await Utilisateur.findOne({address_mail}).exec();
        if (utilisateurEX) {
            return res.status(400).json({message:"Cet e-mail deja utilisé."});
        }
        //hashage du mdp pour la sec
        
        const mdp_hashe = await hashagePassword(mot_de_passe);
        const nouvelleUtilisater = new Utilisateur({
            nom,
            address_mail,
            mot_de_passe: mdp_hashe ,//sauvegarder la mdp aprés le hashage
            role
        });

        await nouvelleUtilisater.save();

        res.status(201).json(nouvelleUtilisater);
        console.log("Utilisateur enregistrer avec succes");
    } catch (error) {//traitement d'erreur
        res.status(400).json({message: error.message});
    }
};

const authentification = async (req,res) => {
    try {
        const {address_mail,mot_de_passe} = req.body;
        const utilisateur = await Utilisateur.findOne({address_mail});
        if (!utilisateur) {
            return res.status(404).json({message :"Utilisateur n'existe pas."});
        }
        const check = verifierPassword(mot_de_passe,utilisateur.mot_de_passe);
        if(!check){
            return res.status(401).json({message:"mot de passe incorrect"});
        }
        const token = genererToken({ id: utilisateur._id, role: utilisateur.role },process.env.JWT_SECRET);
        res.status(200).json({message : "authentification avec succes.",token,utilisateur});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

const getUtilisateurs = async (req, res) => {
    try {
        // Fetch all users from the database
        const utilisateurs = await Utilisateur.find().exec();

        if (!utilisateurs || utilisateurs.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé." });
        }

        res.status(200).json(utilisateurs);
        console.log("Liste des utilisateurs :", utilisateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUtilisateurById = async (req,res) => {
    try {
        const {id} =req.params;
        const utilisateur = await Utilisateur.findById(id).exec();


        if(!utilisateur){
            return res.status(404).json({message: "Utilisateur non trouvé."});
        }
        res.status(200).json(utilisateur);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
    ;
}

const getUtilisateursByNom = async (req, res) => {
    try {
        const { nom } = req.params;

        // Find users with the matching name
        const utilisateurs = await Utilisateur.find({ nom }).exec();

        if (!utilisateurs || utilisateurs.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec ce nom." });
        }

        res.status(200).json(utilisateurs);
        console.log("Utilisateurs trouvés :", utilisateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getUtilisateursByAdr = async (req, res) => {
    try {
        const { address_mail } = req.params;

        // Find a single user by email
        const utilisateur = await Utilisateur.findOne({ address_mail }).exec();

        if (!utilisateur) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé avec cette adresse e-mail." });
        }

        res.status(200).json(utilisateur);
        console.log("Utilisateur trouvé :", utilisateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUtilisateurById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the user ID from request parameters.
        const { nom, address_mail, mot_de_passe } = req.body; // Extract the fields to be updated from the request body.

        // Find the user by ID and update the fields provided in the request body.
        const utilisateur = await Utilisateur.findByIdAndUpdate(
            id, // The ID of the user to update.
            { nom, address_mail, mot_de_passe }, // The fields to update.
            { new: true, runValidators: true } // Return the updated document and validate input.
        );

        // If the user doesn't exist, return a 404 error.
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Respond with the updated user details.
        res.status(200).json(utilisateur);
    } catch (error) {
        // Handle errors, such as invalid ID format or validation issues.
        res.status(500).json({ message: error.message });
    }
};

const deleteUtilisateurById = async (req, res) => {
    try {
        const { id } = req.params; // Extract the user ID from request parameters.

        // Find the user by ID and delete them.
        const utilisateur = await Utilisateur.findByIdAndDelete(id);

        // If the user doesn't exist, return a 404 error.
        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Respond with a success message.
        res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        // Handle errors, such as invalid ID format or server issues.
        res.status(500).json({ message: error.message });
    }
};
module.exports = {creeUtilisateur,getUtilisateurById,getUtilisateurs,getUtilisateursByAdr,getUtilisateursByNom,deleteUtilisateurById,updateUtilisateurById,authentification};