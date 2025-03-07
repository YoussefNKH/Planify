require ('dotenv').config(); //chargement des variables d'environement
const express =require ('express');
const cors = require('cors');
const connectDB = require('./config/db.js');
const utilisateurRoutes =  require('./routes/utilisateurRoutes.js');
const evenementRoutes =  require('./routes/evenementRoutes.js');
const ticketRoutes =require('./routes/ticketRoutes.js');
const stadeRoutes =require('./routes/stadeRoutes.js');
const reservationRoutes=require('./routes/reservationRoutes.js');
//Initialisation de notre application

const app =express();
const PORT = process.env.PORT ;

app.use(express.json()); //Parse JSON req
//Connexion aux base de données
app.use(cors());
connectDB();

//importation des routes
app.use('/api/utilisateurs',utilisateurRoutes); 
app.use('/api/evenements', evenementRoutes); 
app.use('/api/tickets', ticketRoutes); 
app.use('/api/stades', stadeRoutes);
app.use('/api/reservations', reservationRoutes);

//traitement des erreur 
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ message: err.message || 'Erreur du server' });// throwing the error to the middelware
  });

//lancement du server 
app.listen(PORT, () => console.log(`Lancement du server sur le Port : ${PORT}`));  