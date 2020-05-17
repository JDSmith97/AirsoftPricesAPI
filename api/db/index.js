const mysql = require('mysql')
const fs = require('fs');

const ssm = require('./../ssm')
const deletePatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/deletePatrolBasePrice.sql').toString()
const insertPatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/insertPatrolBasePrice.sql').toString()

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

const insertItemsPatrolBase = async (itemId, price, stockStatus) => {
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
    item_stock: stockStatus
  }

  console.log(itemDetails)

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

module.exports = {
  getItems,
  insertItemsPatrolBase
}