const db = require('../db')

const cols = (items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  return ({
    price, 
    stockStatus, 
    onSale, 
    priceDifference
  })
}

const patrolBase = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsPatrolBase(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const surplusStore = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemseSurplusStore(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const redwolfAirsoft = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsRedwolfAirsoft(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const zeroOneAirsoft = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsZeroOneAirsoft(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const airsoftWorld = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsAirsoftWorld(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const landWarriorAirsoft = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsLandWarriorAirsoft(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const fireSupport = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsFireSupport(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const wolfArmouries = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsWolfArmouries(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const skirmshop = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsSkirmshop(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

const bullseyeCountrySport = async (dbConnection, itemId, items) => {
  const data = cols(items)
  await db.insertItemsBullseyeCountrySport(dbConnection, itemId, data.price, data.stockStatus, data.onSale, data.priceDifference)
}

module.exports = {
  patrolBase,
  surplusStore,
  redwolfAirsoft,
  zeroOneAirsoft,
  airsoftWorld,
  landWarriorAirsoft,
  fireSupport,
  wolfArmouries,
  skirmshop,
  bullseyeCountrySport
}