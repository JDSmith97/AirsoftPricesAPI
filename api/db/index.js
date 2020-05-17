const mysql = require('mysql')
const fs = require('fs');

const ssm = require('./../ssm')
const deletePatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/deletePatrolBasePrice.sql').toString()
const insertPatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/insertPatrolBasePrice.sql').toString()
const deleteSurplusStorePriceSQL = fs.readFileSync(__dirname + '/sql/deleteSurplusStorePrice.sql').toString()
const insertSurplusStorePriceSQL = fs.readFileSync(__dirname + '/sql/insertSurplusStorePrice.sql').toString()

const getItems = async () => {
  const dbCreds = await ssm.ssmConfig()
  
  dbconnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbconnection.connect()
  
  return new Promise(function(resolve, reject){
    dbconnection.query('SELECT * FROM items', function (error, results, fields) {
      if (error){
        reject(error)
      }
      dbconnection.end()
      resolve(JSON.stringify(results))
    })
  })
}

const deleteItemsPatrolBase = async (itemId) => {
  const dbCreds = await ssm.ssmConfig()

  dbconnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbconnection.connect()

  return new Promise(function(resolve, reject){
    dbconnection.query(deletePatrolBasePriceSQL, itemId, function ( error, results ) {
      if (error){
        reject(error)
      }
    })
    dbconnection.end()
    resolve()
  })
}

const deleteItemsSurplusStore = async (itemId) => {
  const dbCreds = await ssm.ssmConfig()

  dbconnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbconnection.connect()

  return new Promise(function(resolve, reject){
    dbconnection.query(deleteSurplusStorePriceSQL, itemId, function ( error, results ) {
      if (error){
        reject(error)
      }
    })
    dbconnection.end()
    resolve()
  })
}

const insertItemsPatrolBase = async (itemId, price, stockStatus, onSale) => {
  await deleteItemsPatrolBase(itemId)

  const dbCreds = await ssm.ssmConfig()

  dbconnection = mysql.createConnection({
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

  return new Promise(function(resolve, reject){
    dbconnection.query(insertPatrolBasePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        reject(error)
      }
    })
    dbconnection.end()
    resolve()
  })
}

const insertItemsSurplusStore = async (itemId, price, stockStatus, onSale) => {
  await deleteItemsSurplusStore(itemId)

  const dbCreds = await ssm.ssmConfig()

  dbconnection = mysql.createConnection({
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

  return new Promise(function(resolve, reject){
    dbconnection.query(insertSurplusStorePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        reject(error)
      }
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