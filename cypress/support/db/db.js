const mysql = require("mysql2/promise");

let pool;

async function connectDB(dbConfig) {
    if (!pool) {
        pool = mysql.createPool(dbConfig);
        
        // Handle pool-level errors
        pool.on('error', (err) => {
            console.error('[DB Pool Error]', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
                pool = null; // Mark pool for recreation on next request
            }
        });
    }
    return pool;
}

async function queryDb(dbConfig, query) {
    let dbPool = await connectDB(dbConfig);
    try {
        const [rows] = await dbPool.execute(query);
        return rows;
    } catch (error) {
        console.error('[DB Query Error]', error);
        if (error.code === 'ECONNRESET' || error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Retrying query once after connection reset...');
            pool = null; // Clear pool to force fresh connection
            dbPool = await connectDB(dbConfig);
            const [rows] = await dbPool.execute(query);
            return rows;
        }
        throw error;
    }
}

module.exports = { queryDb };