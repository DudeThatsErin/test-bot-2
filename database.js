const mysql = require('mysql2');
const config = require('./config.json')

const pool = mysql.createPool({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});
const promisePool = pool.promise();
module.exports = promisePool;