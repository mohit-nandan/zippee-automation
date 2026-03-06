const mysql = require("mysql2/promise");

let pool;

async function connectDB(dbConfig) {
    if (!pool) {
        pool = mysql.createPool(dbConfig);
        console.log("DB Pool Created");
    }
    return pool;
}

async function queryDb(dbConfig, query) {
    const dbPool = await connectDB(dbConfig);
    const [rows] = await dbPool.execute(query);
    return rows;
}

module.exports = { queryDb };