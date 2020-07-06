const mysql = require('mysql')
const fs = require('fs')

const categoriesSql = fs.readFileSync(__dirname + '/sql/getCategories.sql').toString()
const manufacturersSql = fs.readFileSync(__dirname + '/sql/getManufacturers.sql').toString()

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

const getDetails = (dbConnection, categories, manufacturers) => {
  return new Promise(function(resolve, reject) {
    if(categories) {
      dbConnection.query(categoriesSql, function (error, results, fields) {
        if (error){
          console.log(error)
        }
        dbConnection.end(error => error ? reject(error) : resolve(JSON.stringify(results)))
      })
    } else if(manufacturers) {
      dbConnection.query(manufacturersSql, function (error, results, fields) {
        if (error){
          console.log(error)
        }
        dbConnection.end(error => error ? reject(error) : resolve(JSON.stringify(results)))
      })
    }
  })
}

module.exports = {
  getDbConnection,
  getDetails
}