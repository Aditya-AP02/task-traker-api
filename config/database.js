// config/database.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Pass@123', // IMPORTANT: Use the same password you used in Workbench!
    database: 'task_tracker_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

// Test the connection
(async () => {
    try {
        const [result] = await promisePool.query('SELECT 1 + 1 AS solution');
        console.log('✅ MySQL connected successfully!');
    } catch (error) {
        console.error('❌ MySQL connection failed:', error.message);
    }
})();

module.exports = promisePool;