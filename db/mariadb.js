const mariadb = require('mariadb');
const config = require('./../config/dev.json');

const pool = mariadb.createPool(
    {
        host: config.db.mysql.host,
        port: config.db.mysql.port,
        database: config.db.mysql.database,
        user: config.db.mysql.user,
        password: config.db.mysql.password,
        connectionLimit: 2
    });

pool.getConnection()
    .then(conn => {
        console.log("connected ! connection id is " + conn.threadId);
        conn.release(); //release to pool
    })
    .catch(err => {
        console.log("not connected due to error: " + err);
    });

module.exports = pool;