require("dotenv").config();

function getDbConfig(envName) {
    const prefix = envName.toUpperCase();

    return {
        host: process.env[`${prefix}_DB_HOST`],
        user: process.env[`${prefix}_DB_USER`],
        password: process.env[`${prefix}_DB_PASSWORD`],
        database: process.env[`${prefix}_DB_NAME`],
        port: process.env[`${prefix}_DB_PORT`],
        ssl: {
            rejectUnauthorized: false,
        },
        waitForConnections: true,
        connectionLimit: 10,
        enableKeepAlive: true,
        keepAliveInitialDelay: 10000,
    };
}

module.exports = { getDbConfig };