const mysql = require('mysql')
const fs = require('fs');

const insertPatrolBasePriceSQL = fs.readFileSync(__dirname + '/sql/insertPatrolBasePrice.sql').toString()
const insertSurplusStorePriceSQL = fs.readFileSync(__dirname + '/sql/insertSurplusStorePrice.sql').toString()
const insertRedwolfAirsoftPriceSQL = fs.readFileSync(__dirname + '/sql/insertRedwolfAirsoftPrice.sql').toString()
const insertZeroOneAirsoftSQL = fs.readFileSync(__dirname + '/sql/insertZeroOneAirsoftPrice.sql').toString()
const insertAirsoftWorldSQL = fs.readFileSync(__dirname + '/sql/insertAirsoftWorldPrice.sql').toString()
const insertLandWarriorAirsoftSQL = fs.readFileSync(__dirname + '/sql/insertLandWarriorAirsoftPrice.sql').toString()
const insertFireSupportSQL = fs.readFileSync(__dirname + '/sql/insertFireSupportPrice.sql').toString()
const insertWolfArmouriesSQL = fs.readFileSync(__dirname + '/sql/insertWolfArmouriesPrice.sql').toString()
const insertSkirmshopSQL = fs.readFileSync(__dirname + '/sql/insertSkirmshopPrice.sql').toString()

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
    dbConnection.query('SELECT * FROM items', function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const insertItemsPatrolBase = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    patrol_base_price: price,
    patrol_base_stock: stockStatus,
    patrol_base_sale: onSale,
    patrol_base_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertPatrolBasePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsSurplusStore = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    surplus_store_price: price,
    surplus_store_stock: stockStatus,
    surplus_store_sale: onSale,
    surplus_store_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertSurplusStorePriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsRedwolfAirsoft = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    redwolf_airsoft_price: price,
    redwolf_airsoft_stock: stockStatus,
    redwolf_airsoft_sale: onSale,
    redwolf_airsoft_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertRedwolfAirsoftPriceSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsZeroOneAirsoft = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    zero_one_airsoft_price: price,
    zero_one_airsoft_stock: stockStatus,
    zero_one_airsoft_sale: onSale,
    zero_one_airsoft_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertZeroOneAirsoftSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsAirsoftWorld = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    airsoft_world_price: price,
    airsoft_world_stock: stockStatus,
    airsoft_world_sale: onSale,
    airsoft_world_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertAirsoftWorldSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsLandWarriorAirsoft = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    land_warrior_airsoft_price: price,
    land_warrior_airsoft_stock: stockStatus,
    land_warrior_airsoft_sale: onSale,
    land_warrior_airsoft_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertLandWarriorAirsoftSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsFireSupport = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    fire_support_price: price,
    fire_support_stock: stockStatus,
    fire_support_sale: onSale,
    fire_support_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertFireSupportSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsWolfArmouries = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    wolf_armouries_price: price,
    wolf_armouries_stock: stockStatus,
    wolf_armouries_sale: onSale,
    wolf_armouries_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertWolfArmouriesSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

const insertItemsSkirmshop = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    skirmshop_price: price,
    skirmshop_stock: stockStatus,
    skirmshop_sale: onSale,
    skirmshop_discount: priceDifference
  }

  return new Promise(function(resolve, reject) {
    dbConnection.query(insertSkirmshopSQL, [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
      // console.log('inserted', itemDetails.item_id, error, results)
    })
    resolve()
  })
}

module.exports = {
  getDbConnection,
  getItems,
  insertItemsPatrolBase,
  insertItemsSurplusStore,
  insertItemsRedwolfAirsoft,
  insertItemsZeroOneAirsoft,
  insertItemsAirsoftWorld,
  insertItemsLandWarriorAirsoft,
  insertItemsFireSupport,
  insertItemsWolfArmouries,
  insertItemsSkirmshop
}