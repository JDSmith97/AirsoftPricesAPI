const db = require('../db')

const patrolBase = async (dbCreds, itemId, items) => {
  const price = items[0]
  const stockStatus = items[2]
  const onSale = items[1]
  
  await db.insertItemsPatrolBase(dbCreds, itemId, price, stockStatus, onSale)
  
}

const surplusStore = async (dbCreds, itemId, items) => {
  const price = items[0]
  const stockStatus = items[2]
  const onSale = items[1]

  await db.insertItemsSurplusStore(dbCreds, itemId, price, stockStatus, onSale)
}

module.exports = {
  patrolBase,
  surplusStore
}