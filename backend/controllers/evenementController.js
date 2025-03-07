const Ev = require('../models/evenement.model');
const Stade = require('../models/stade.model');
//fnct qui creer un evenement et le stocké aux base de données 
const creeEvenement = async (req,res) => {
    try {
        const {nom,description,dateDebut,dateFin,lieu,prixMoyenBillet,stade,statut,image,categorie,billetsVendus} = req.body;
        const stade_exist = await Stade.findById(stade);
        if(!stade_exist){
            return res.status(404).json({message : "Le stade spécifié n'existe pas."});
        }

        const nouvelleEvenement = new Ev({
            nom,
            description,
            dateDebut,
            dateFin,
            lieu,
            capacite:stade_exist.capacite,
            prixMoyenBillet,
            stade,
            statut,
            image,
            categorie,
            billetsVendus
        });
        await nouvelleEvenement.save();
        res.status(201).json(nouvelleEvenement);
        console.log("Evenement enregistrer avec succes");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
//affichage de tous les événement
const getEvenements = async (req,res) => {
    try {
        const evenements = await Ev.find().populate('stade').exec();
        if(!evenements || evenements.length ===0){
            return res.status(404).json({ message: "Aucun evenement trouvé."}); 
        }
        res.status(200).json(evenements);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
//affichage de l'évenement dans un stade particulier a l'aide de Id du stade
const getEvenementByStade = async (req,res) => {
    try {
        const {stadeId}=req.params;
        const evenements = await Ev.find({stade:stadeId}).exec();
        if(!evenements || evenements.length === 0){
            return res.status(404).json({message: "Aucun evenement trouvé avec dans ce Stade."});

        }
        res.status(200).json(reservations);
        console.log("evenement dans ce stade ",evenements,stadeId);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    
};
//affichage de l'évenement selon le lieu
const getEvenementBylieu = async (req,res) => {
    try {
        const {lieu}=req.params;
        const evenements = await Ev.find({ lieu }).exec();
        if (!evenements || evenements.length === 0) {
            return res.status(404).json({ message: "Aucun evenement trouvé avec ce lieu." });
        }
        res.status(200).json(evenements);
        console.log("evenement trouvés :", evenements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//mise a jour du évenement selon l id 
const updateEvenementById = async (req, res) => {
    try {
        const { id } = req.params; 
        const updateData = req.body; 
        const updatedEvenement = await Ev.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } 
        );
        //check évenement existe ou non
        if (!updatedEvenement) {
            return res.status(404).json({ message: "Événement non trouvé." });
        }
        res.status(200).json(updatedEvenement);
        console.log("Événement mis à jour avec succès :", updatedEvenement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//supprimer un evenement
const deleteEvenementById = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedEvenement = await Ev.findByIdAndDelete(id);
        //check évenement existe ou non
        if (!deletedEvenement) {
            return res.status(404).json({ message: "Événement non trouvé." });
        }
        res.status(200).json({ message: "Événement supprimé avec succès." });
        console.log("Événement supprimé :", deletedEvenement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//affichage de l'evenement selon la catégorie donner par l'utilisateur
const getEvenementByCategorie = async (req, res) => {
    try {
        const { categorie } = req.params; 
        const evenements = await Ev.find({ categorie }).exec();
        if (!evenements || evenements.length === 0) {
            return res.status(404).json({ message: "Aucun événement trouvé pour cette catégorie." });
        }
        res.status(200).json(evenements);
        console.log("Événements trouvés pour la catégorie :", categorie, evenements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//affichage de l'évenement active 
const getActiveEvenements = async (req, res) => {
    try {
        const currentDate = new Date();
        const evenements = await Ev.find({
            $or: [
                { statut: 'en cours' },
                { 
                    dateDebut: { $lte: currentDate }, 
                    dateFin: { $gte: currentDate } 
                }
            ]
        }).exec();
        if (!evenements || evenements.length === 0) {
            return res.status(404).json({ message: "Aucun événement actif trouvé." });
        }
        res.status(200).json(evenements);
        console.log("Événements actifs trouvés :", evenements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//recherche de événement 
const searchEvenements = async (req, res) => {
    try {
        const { nom, description, lieu, categorie, statut } = req.query;
        const query = {};

        if (nom) {
            query.nom = { $regex: nom, $options: 'i' }; 
        }
        if (description) {
            query.description = { $regex: description, $options: 'i' };
        }
        if (lieu) {
            query.lieu = { $regex: lieu, $options: 'i' };
        }
        if (categorie) {
            query.categorie = categorie; 
        }
        if (statut) {
            query.statut = statut; 
        }
        const evenements = await Ev.find(query).exec();
        if (!evenements || evenements.length === 0) {
            return res.status(404).json({ message: "Aucun événement trouvé correspondant aux critères de recherche." });
        }
        res.status(200).json(evenements);
        console.log("Événements trouvés :", evenements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//affichage des évenement complet
const getFullyBookedEvenements = async (req, res) => {
    try {
        const evenements = await Ev.find({ $expr: { $eq: ['$billetsVendus', '$capacite'] } });

        if (!evenements || evenements.length === 0) {
            return res.status(404).json({ message: "Aucun événement complet trouvé." });
        }

        res.status(200).json(evenements);
        console.log("Événements complets :", evenements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getEvenementDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const evenement = await Ev.findById(id).populate('stade');

        if (!evenement) {
            return res.status(404).json({ message: "Événement non trouvé." });
        }

        res.status(200).json(evenement);
        console.log("Détails de l'événement :", evenement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const incrementBilletsVendus = async (req, res) => {
    try {
        const { id } = req.params;
        const { billetsVendus } = req.body;

        const evenement = await Ev.findByIdAndUpdate(
            id,
            { $inc: { billetsVendus: billetsVendus } },
            { new: true }
        );

        if (!evenement) {
            return res.status(404).json({ message: "Événement non trouvé." });
        }

        res.status(200).json(evenement);
        console.log("Billets vendus mis à jour :", evenement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// affichage des evenement dans un intervalle du date 
const getEvenementsByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: "Les paramètres startDate et endDate sont requis." });
        }

        const evenements = await Ev.find({
            dateDebut: { $gte: new Date(startDate) },
            dateFin: { $lte: new Date(endDate) }
        });

        if (!evenements || evenements.length === 0) {
            return res.status(404).json({ message: "Aucun événement trouvé dans cette plage de dates." });
        }

        res.status(200).json(evenements);
        console.log("Événements dans la plage de dates :", evenements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {getEvenementsByDateRange,incrementBilletsVendus,getEvenementDetails,getFullyBookedEvenements,getActiveEvenements,creeEvenement,getEvenements,getEvenementByStade,getEvenementBylieu,updateEvenementById,deleteEvenementById,getEvenementByCategorie,searchEvenements};