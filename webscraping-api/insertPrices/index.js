const db = require('../db')

const patrolBase = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  await db.insertItemsPatrolBase(dbConnection, itemId, price, stockStatus, onSale, priceDifference)
  
}

const surplusStore = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  await db.insertItemsSurplusStore(dbConnection, itemId, price, stockStatus, onSale, priceDifference)
}

const redwolfAirsoft = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  await db.insertItemsRedwolfAirsoft(dbConnection, itemId, price, stockStatus, onSale, priceDifference)
}

const zeroOneAirsoft = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  await db.insertItemsZeroOneAirsoft(dbConnection, itemId, price, stockStatus, onSale, priceDifference)
}

const airsoftWorld = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  await db.insertItemsAirsoftWorld(dbConnection, itemId, price, stockStatus, onSale, priceDifference)
}

const landWarriorAirsoft = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  await db.insertItemsLandWarriorAirsoft(dbConnection, itemId, price, stockStatus, onSale, priceDifference)
}

const fireSupport = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[3]
  const onSale = items[1]
  const priceDifference = items[2]

  await db.insertItemsFireSupport(dbConnection, itemId, price, stockStatus, onSale, priceDifference)
}

module.exports = {
  patrolBase,
  surplusStore,
  redwolfAirsoft,
  zeroOneAirsoft,
  airsoftWorld,
  landWarriorAirsoft,
  fireSupport
}