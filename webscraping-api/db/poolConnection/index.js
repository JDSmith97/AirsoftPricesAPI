const mysql = require("mysql")

const getPoolConnection = function(dbCreds) {
  const pool = mysql.createPool({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name,
    connectionLimit: 3,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000
  });
  return pool
}

module.exports = {
  getPoolConnection
}