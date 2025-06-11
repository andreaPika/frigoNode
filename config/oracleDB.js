const oracledb = require('oracledb');

const oracleConfig = {
    user: process.env.ORACLE_USER,
    password: process.env.ORACLE_PASSWORD,
    connectString: process.env.ORACLE_CONNECT_STRING,
};

const connectOracle = async () => {
    try {
        const connection = await oracledb.getConnection(oracleConfig);
        console.log('Connesso al database Oracle');
        return connection;
    } catch (error) {
        console.error('Errore di connessione a Oracle:', error.message);
        throw error;
    }
};

module.exports = connectOracle;
