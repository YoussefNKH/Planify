const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
  nom: 
  { type: String,
     required: true 
    },
  address_mail: 
  { type: String,
     required: true,
      unique: true 
    },
  mot_de_passe: 
  { type: String,
     required: true
     },
  role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
  }
}
,{timestamps:true});

const Utilisateur = mongoose.model('Utilisateur', utilisateurSchema);

module.exports = Utilisateur;