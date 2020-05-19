const mysql = require('mysql')
const fs = require('fs');

const deletePatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/deletePatrolBasePrice.sql').toString()
const insertPatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/insertPatrolBasePrice.sql').toString()
const deleteSurplusStorePriceSQL = fs.readFileSync(__dirname + '/sql/deleteSurplusStorePrice.sql').toString()
const insertSurplusStorePriceSQL = fs.readFileSync(__dirname + '/sql/insertSurplusStorePrice.sql').toString()

const getItems = async (dbCreds) => {
  const dbconnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbconnection.connect()

  return new Promise(function(resolve, reject) {
    dbconnection.query('SELECT * FROM items', function (error, results, fields) {
      if (error){
        reject(error)
      }
      dbconnection.end()
      resolve(JSON.stringify(results))
    })
  })
}

const insertItemsPatrolBase = async (dbCreds, itemId, price, stockStatus, onSale) => {
  const dbconnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbconnection.connect()

  const itemDetails = {
    item_id: itemId,
    item_price: price,
    item_stock: stockStatus,
    item_on_sale: onSale
  }

  return new Promise(function(resolve, reject) {
    dbconnection.query(deletePatrolBasePriceSQL, itemDetails.item_id, function ( error, results ) {
      if (error){
        reject(error)
      }
    })
    dbconnection.query(insertPatrolBasePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        reject(error)
      }
    })
    dbconnection.end()
    resolve()
  })
}

const insertItemsSurplusStore = async (dbCreds, itemId, price, stockStatus, onSale) => {
  const dbconnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbconnection.connect()

  const itemDetails = {
    item_id: itemId,
    item_price: price,
    item_stock: stockStatus,
    item_on_sale: onSale
  }

  return new Promise(function(resolve, reject) {
    dbconnection.query(deleteSurplusStorePriceSQL, itemDetails.item_id, function ( error, results ) {
      if (error){
        reject(error)
      }
      console.log('deleted', itemDetails.item_id)
    })
    dbconnection.query(insertSurplusStorePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        reject(error)
      }
      console.log('inserted', itemDetails.item_id)
    })
    dbconnection.end()
    resolve()
  })
}

module.exports = {
  getItems,
  insertItemsPatrolBase,
  insertItemsSurplusStore
}