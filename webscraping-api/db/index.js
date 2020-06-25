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
const insertBullseyeCountrySportSQL = fs.readFileSync(__dirname + '/sql/insertBullseyeCountrySportPrice.sql').toString()

const pricesSql = {
  "patrol_base": insertPatrolBasePriceSQL,
  "surplus_store": insertSurplusStorePriceSQL,
  "redwolf_airsoft": insertRedwolfAirsoftPriceSQL,
  "zero_one_airsoft": insertZeroOneAirsoftSQL,
  "airsoft_world": insertAirsoftWorldSQL,
  "land_warrior_airsoft": insertLandWarriorAirsoftSQL,
  "fire_support": insertFireSupportSQL,
  "wolf_armouries": insertWolfArmouriesSQL,
  "skirmshop": insertSkirmshopSQL,
  "bullseye_country_sport": insertBullseyeCountrySportSQL
}

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

const closeDbConnection = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.end(error => error ? reject(error) : resolve("DB Connection ended"))
  })
}

const getItems = async (dbCreds) => {
  const dbConnection = await getDbConnection(dbCreds)

  return new Promise(function(resolve, reject) {
    dbConnection.query('SELECT * FROM items', function (error, results, fields) {
      if (error){
        console.log(error)
      }
      dbConnection.end(error => error ? reject(error) : resolve(JSON.stringify(results)))
    })
  })
}

const insertItemDetails = async (dbCreds, store, itemId, price, stockStatus, onSale, priceDifference) => {
  const itemDetails = {
    item_id: itemId,
    [`${store}_price`]: price,
    [`${store}_stock`]: stockStatus,
    [`${store}_sale`]: onSale,
    [`${store}_discount`]: priceDifference
  }

  const dbConnection = await getDbConnection(dbCreds)

  return new Promise(function(resolve, reject) {
    dbConnection.query(pricesSql[store], [itemDetails, itemDetails], function ( error, results ) {
      if (error){
        console.log(error)
      }
    })
    dbConnection.end(error => error ? reject(error) : resolve("DB Connection ended"))
  })
}

const insertItemsPatrolBase = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "patrol_base", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsSurplusStore = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "surplus_store", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsRedwolfAirsoft = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "redwolf_airsoft", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsZeroOneAirsoft = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "zero_one_airsoft", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsAirsoftWorld = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "airsoft_world", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsLandWarriorAirsoft = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "land_warrior_airsoft", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsFireSupport = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "fire_support", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsWolfArmouries = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "wolf_armouries", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsSkirmshop = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "skirmshop", itemId, price, stockStatus, onSale, priceDifference)
}

const insertItemsBullseyeCountrySport = async (dbConnection, itemId, price, stockStatus, onSale, priceDifference) => {
  insertItemDetails(dbConnection, "bullseye_country_sport", itemId, price, stockStatus, onSale, priceDifference)
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
  insertItemsSkirmshop,
  insertItemsBullseyeCountrySport,
  closeDbConnection
}