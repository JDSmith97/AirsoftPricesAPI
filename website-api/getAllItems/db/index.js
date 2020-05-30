const mysql = require('mysql')
const fs = require('fs')

const getAllItemsSql = fs.readFileSync(__dirname + '/sql/getAllItems.sql').toString()

const getDbConnection = async (dbCreds) => {
  const dbConnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbConnection.connect()

  return dbConnection
}

const getItems = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getAllItemsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      dbConnection.end(error => error ? reject(error) : resolve(JSON.stringify(results)));
    })
  })
}

module.exports = {
  getDbConnection,
  getItems
}