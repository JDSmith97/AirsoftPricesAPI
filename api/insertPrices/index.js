const db = require('../db')

const patrolBase = async (itemId, items) => {
  const price = items[0]
  const stockStatus = items[2]
  const onSale = items[1]
  
  await db.insertItemsPatrolBase(itemId, price, stockStatus, onSale)
  
}

const surplusStore = async (itemId, items) => {
  const price = items[0]
  const stockStatus = items[2]
  const onSale = items[1]

  await db.insertItemsSurplusStore(itemId, price, stockStatus, onSale)
}

module.exports = {
  patrolBase,
  surplusStore
}