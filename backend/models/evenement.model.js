const mongoose =require ('mongoose');

const evenementSchema = new mongoose.Schema({
    nom:
    {
        type: String,
        required:true
    },
    description: 
    { // Description de l'événement
         type: String
    }, 
    dateDebut:
    { // Date de début
         type: Date,
          required: true 
    }, 
    dateFin: 
    {// Date de fin
         type: Date
    }, 
    lieu: 
    { // Nom du lieu (ex : une section spécifique du stade)
        type: String,
         required: true
    }, 
    capacite: 
    { // Capacité du lieu
        type: Number,
         required: true 
    }, 
    prixMoyenBillet: 
    { // Prix moyen des billets
        type: Number
    }, 
    stade: 
    { // Référence au modèle Stade
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Stade',
          required: true
    }, 
    statut:
    {  // Statut de l'événement
      type: String, 
      enum: ['programmé', 'en cours', 'annulé', 'terminé'], 
      default: 'programmé' 
    },
    image:
    { // Image associée à l'événement
      type: String
    }, 
    categorie: 
    { // Catégorie de l'événement
        type: String,
         enum: ['sport', 'concert', 'conférence', 'autre']
    },
          
    billetsVendus: 
    { // Nombre de billets vendus
        type: Number,
         default: 0 
    }, 
  },
  { timestamps: true } // Champs createdAt et updatedAt automatiques
);

const Evenement = mongoose.model('Evenement', evenementSchema);
module.exports = Evenement;
