const Stade = require('../models/stade.model');
const creeStade = async (req,res) => {
    try {
        const {nom,capacite,adresse,ville,image}=req.body;

        const newStade = new Stade({
            nom,
            capacite,
            adresse,
            ville,
            image
        });
        await newStade.save();
        res.status(201).json(newStade);
        console.log("Stade enregistrer avec succes");
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
const getStades = async (req,res) => {
    try {
        const stades = await Stade.find().exec();
        if(!stades || stades.length ===0){
            return res.status(404).json({message :"Aucun stade trouvé."});
        }
        res.status(200).json(stades);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
    
};
const getStadesById = async (req,res) => {
    try {
        const {id} = req.params;
        const stade = await Stade.findById(id).exec(); 
        if(!stade){
            return res.status(404).json({message : "Aucun stade trouvé avec ce ID"});
        }
        res.status(200).json(stade);     
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const getStadesBynom = async (req,res) => {
    try {
        const {nom}=req.query;
        
        const stades = await Stade.find({ nom: { $regex: nom, $options: 'i' } }).exec();

        if(!stades || stades.length ===0){
           return res.status(404).json({message:"Aucun stade trouvé avec ce nom "});
        }
        res.status(200).json(stades);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};
const getStadesByVille = async (req,res) => {
    try{
    const {ville}=req.query;
    const stades = await Stade.find({ville}).exec();
    if(!stades || stades.length ===0){
      return  res.status(404).json({message:"Aucun stade trouvé dans cette ville"});
    }
    res.status(200).json(stades);
}catch (error) {
    res.status(500).json({message : error.message});
}
};
const deleteStadeById = async (req,res) => {
    try {
        const { id } = req.params;
        const deletedStade = await Stade.findByIdAndDelete(id);
        if(!deletedStade){
           return res.status(404).json({ message :"Stade non trouvé."});
        }
        res.status(200).json({ message : "Stade supprimé avec succès."});
        console.log("Stade supprimé :", deletedStade);
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
};
const updateStadeById = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from the URL parameters
        const updateData = req.body; // Get the data to update from the request body

        // Find the event by ID and update it
        const updatedStade = await Stade.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } 
        );
        if (!updatedStade) {
            return res.status(404).json({ message: "Stade non trouvé." });
        }
        res.status(200).json(updatedStade);
        console.log("Stade mis à jour avec succès :", updatedStade);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports ={creeStade,getStades,getStadesById,getStadesByVille,getStadesBynom,deleteStadeById,updateStadeById};