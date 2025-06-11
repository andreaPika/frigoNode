const connectOracle = require('./oracleDB');
const connectMySQL = require('./mysqlDB');
const connectMongoDB = require('./mongoDB');

const getDatabaseConnection = async (dbType) => {
    switch (dbType) {
        case 'oracle':
            return await connectOracle();
        case 'mysql':
            return await connectMySQL();
        case 'mongodb':
            await connectMongoDB(); // MongoDB usa connessioni persistenti, quindi non serve restituire una connessione diretta.
            return mongoose.connection; // Ritorna la connessione corrente.
        default:
            throw new Error('Tipo di database non supportato');
    }
};

module.exports = { getDatabaseConnection };
