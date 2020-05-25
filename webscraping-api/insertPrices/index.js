const db = require('../db')

const patrolBase = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[2]
  const onSale = items[1]
  
  await db.insertItemsPatrolBase(dbConnection, itemId, price, stockStatus, onSale)
  
}

const surplusStore = async (dbConnection, itemId, items) => {
  const price = items[0]
  const stockStatus = items[2]
  const onSale = items[1]

  await db.insertItemsSurplusStore(dbConnection, itemId, price, stockStatus, onSale)
}

module.exports = {
  patrolBase,
  surplusStore
}