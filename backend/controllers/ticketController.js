const Ticket = require('../models/ticket.model');

const getTickets = async (req,res) => {
    try {
        const tickets = await Ticket.find().populate('utilisateur evenement');
        if (!tickets || tickets === 0 ) {
            return res.status(404).json({message:"Aucune ticket trouvé."});
        }
        res.status(200).json(tickets);
        console.log("voila les tickets",tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getTicketByNum = async (req,res) => {
    try {
        const {numero}=req.params;
        const ticket = await Ticket.findOne({numero}).exec();
        if(!ticket){
            return res.status(404).json({message:"ce ticket avec ce numéro n'existe pas"});
        }
        res.status(200).json(ticket);
        console.log("Voila la ticket ",ticket," du numéro ",numero);      
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const getTicketByUtilisateur = async (req,res) => {
  try {
    const {utilisateur}=req.params;
    const tickets = await Ticket.find({utilisateur}).exec();
    if(!tickets || tickets === 0){
      return  res.status(404).json({message : "ces tickets avec ce utilisateur n'existes pas"});
    }
    res.status(200).json(tickets);
    console.log("les tickets:",tickets,"de l'utilisateur",utilisateur);

  } catch (error) {
    res.status(500).json({ message : error.message});    
  }  
};
const deleteTicketById = async (req,res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if(!deletedTicket){
        return res.status(404).json({ message :"Ticket non trouvé."});
    }
    res.status(200).json({message:"Ticket supprimé"});
    console.log("ticket supprimé :",deletedTicket);
  } catch (error) {
    res.status(500).json({message : error.message});
  }  
};
const updateTicketById = async (req,res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTicket = await Ticket.findByIdAndUpdate(
            id,
            updateData,
            { new: true ,runValidators:true}
        );
        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket non trouvé." });
        }
        res.status(200).json(updatedTicket);
        console.log("Ticket mis a jour avec succés :",updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};
module.exports = {getTicketByUtilisateur,getTickets,getTicketByNum,deleteTicketById,updateTicketById};