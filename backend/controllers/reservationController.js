const Reservation = require('../models/reservation.model');
const Utilisateur = require('../models/utilisateur.model');
const Evenement = require('../models/evenement.model');
const Ticket = require ('../models/ticket.model')
// fnct creer une resevation 
const creeReservation = async (req,res) => {
    try {
        const { utilisateurId,evenementId,nbr_tickets} = req.body;
        //recherche de l'utilisateur et evenement
        const utilisateur = await Utilisateur.findById(utilisateurId);
        const evenement = await Evenement.findById(evenementId);
        //validation des donnée
       
        if (!utilisateur) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        if (!evenement) return res.status(404).json({ message: 'Événement non trouvé' });
        if (!nbr_tickets || nbr_tickets <= 0) return res.status(400).json({ message: 'Nombre de billets invalide' });
        const prixTotal=nbr_tickets*evenement.prixMoyenBillet;
        const nouvelleReservation = new Reservation({
          utilisateur:utilisateur._id,
          evenement:evenement._id,
          nbr_tickets,
          prixTotal ,
          statut:'en attente'
        }); 
        
        await nouvelleReservation.save();
        res.status(201).json(nouvelleReservation);
        console.log("reservation enregistrer avec succes");
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};
const payementDeReservation = async (req,res) => {
  try {
    const { reservationId } = req.params;
    const {pay}=req.body;
    //recherche 
    const reservation = await Reservation.findById(reservationId).populate("evenement utilisateur");
    if (!reservation) {
      return res.status(404).json({ message: "Reservation n'existe pas." });
  }

  if (reservation.statut !== "en attente") {
      return res.status(400).json({ message: "Reservation n'est pas valide pour le payment" });
  }
  // implementation de logique de payment
  const paymentSuccess = true; 
  if (!paymentSuccess) {
    return res.status(400).json({ message: "Payment échoué." });
}

  //mise a jour de reservation status
  reservation.statut="payée";
  await reservation.save();
  //creation du ticket
  const tickets = [];
  for(let i =0;i<reservation.nbr_tickets;i++){
    const ticket = new Ticket({
      numero: `${reservation._id}-${i + 1}`,
      evenement: reservation.evenement._id,
      utilisateur: reservation.utilisateur._id,
      dateEmission : new Date(),
      statut:"valide",
      prix:reservation.evenement.prixMoyenBillet

    });
    await ticket.save();
    tickets.push(ticket);
  }
  //mise a jour evement Capacité
  const evenement=await Evenement.findById(reservation.evenement._id);
  evenement.billetsVendus+=reservation.nbr_tickets;
  await evenement.save();
  res.status(200).json({ message: "Paiement réussi, billets émis", tickets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//affichage du 
const getReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find().populate('utilisateur evenement'); // Include related data
      if(!reservations || reservations.length === 0){
        return res.status(404).json({ message: "Aucune reservation trouvé."});
      }
      res.status(200).json(reservations);
      console.log("voila les resvations",reservations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };  
const getReservationsByEvenement = async (req,res) => {
  try {
    const {evenementId}=req.params;

    const reservations = await Reservation.find({evenement:evenementId}).populate('utilisateur').exec();
    if(!reservations || reservations.length === 0){
      return res.status(404).json({message: "Aucune reservation trouvé avec ce evenement."})
    }
    res.status(200).json(reservations);
    console.log("reservation par evenment ",evenementId);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
};
const getReservationsByUtilisateur = async (req,res) => {
  try {
    const {utilisateurId}=req.params;

    const reservations = await Reservation.find({utilisateur:utilisateurId}).populate('evenement').exec();
    if(!reservations || reservations.length === 0){
      return res.status(404).json({message: "Aucune reservation trouvé avec ce utilisateur."});
    }
    res.status(200).json(reservations);
    console.log("reservation par utilisateur ",utilisateurId);
  } catch (error) {
    res.status(500).json({message : error.message});
  }
};
const deleteReservationsByUtlisateur = async (req,res) => {
  try {
    const {utilisateurId}=req.params;

    const reservations = await Reservation.find({utilisateur:utilisateurId});
    if(reservations.length ===0){
      return res.status(404).json({ message: `Toutes les réservations pour l'utilisateur ${userId} ont été supprimées.` });
    }
    await Reservation.deleteMany({utilisateur:utilisateurId});
    return res.status(200).json({ message: `Toutes les réservations pour l'utilisateur ${userId} ont été supprimées.` });
  } catch (error) {
    res.status(500).json({message : "Erreur serveur lors de la suppression des réservations."});
  }
};
const deleteReservation = async (req,res) => { 
    const { id } = req.params;
    try {
      // Vérifier si la réservation existe
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        return res.status(404).json({ message: "Réservation introuvable." });
      }
      await reservation.deleteOne();
      return res.status(200).json({ message: `La réservation avec l'ID ${id} a été supprimée avec succès.` });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur lors de la suppression de la réservation." });
  }
  
};

const updateReservation =async (req,res) => {
  const { id } = req.params; // Récupérer l'ID de la réservation depuis les paramètres
  const updates = req.body; // Obtenir les données à mettre à jour depuis la requête

  try {
    // Vérifier si la réservation existe
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ message: "Réservation introuvable." });
    }
    // Mettre à jour la réservation avec les données fournies
    Object.keys(updates).forEach((key) => {
      reservation[key] = updates[key];
    });
    const updatedReservation = await reservation.save();

    return res.status(200).json({
      message: "Réservation mise à jour avec succès.",
      data: updatedReservation,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Erreur serveur lors de la mise à jour de la réservation.",
    });
  }
};
module.exports = { payementDeReservation,creeReservation ,getReservationsByUtilisateur,getReservationsByEvenement,getReservations,deleteReservation,deleteReservationsByUtlisateur,updateReservation};