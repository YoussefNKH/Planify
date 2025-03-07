const mongoose = require('mongoose');
//implémentation du fcnt qui connect aux base de données
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connection aux MongoDB : ${conn.connection.host}`);
  } catch (err) {
    console.error(`Erreur: ${err.message}`);
    process.exit(1); // echec de connection aux BD
  }
};

module.exports = connectDB;