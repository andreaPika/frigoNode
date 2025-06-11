const mysql = require('mysql2/promise');

const mysqlConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
};

const connectMySQL = async () => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        console.log('Connesso al database MySQL');
        return connection;
    } catch (error) {
        console.error('Errore di connessione a MySQL:', error.message);
        throw error;
    }
};

module.exports = connectMySQL;
