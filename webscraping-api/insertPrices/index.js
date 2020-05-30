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

module.exports = {
  patrolBase,
  surplusStore
}