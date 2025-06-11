const mongoose = require('mongoose');

const mongoConfig = process.env.MONGO_URI;

const connectMongoDB = async () => {
    try {
          await mongoose.connect(process.env.MONGO_URI);
          console.log('Connesso a MongoDB con successo!');
        } catch (err) {
          console.error('Errore nella connessione a MongoDB:', err);
        }
      }
};

module.exports = connectMongoDB;
