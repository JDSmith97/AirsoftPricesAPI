const mysql = require('mysql')
const fs = require('fs');

const insertPatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/insertPatrolBasePrice.sql').toString()
const insertSurplusStorePriceSQL = fs.readFileSync(__dirname + '/sql/insertSurplusStorePrice.sql').toString()

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

// const endDbConnection = async (dbConnection) => {
//   dbConnection.end()
// }

const getItems = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query('SELECT * FROM items', function (error, results, fields) {
      if (error){
        reject(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const insertItemsPatrolBase = async (dbConnection, itemId, price, stockStatus, onSale) => {
  const itemDetails = {
    item_id: itemId,
    item_price: price,
    item_stock: stockStatus,
    item_on_sale: onSale
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertPatrolBasePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        reject(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsSurplusStore = async (dbConnection, itemId, price, stockStatus, onSale) => {
  const itemDetails = {
    item_id: itemId,
    item_price: price,
    item_stock: stockStatus,
    item_on_sale: onSale
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertSurplusStorePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        reject(error)
      }
      console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

module.exports = {
  getDbConnection,
  getItems,
  insertItemsPatrolBase,
  insertItemsSurplusStore
}