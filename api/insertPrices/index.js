const db = require('../db')

const patrolBase = async (itemId, items) => {
  const price = items[0]
  const stockStatus = items[1]
  
  const insertedItems = await db.insertItemsPatrolBase(itemId, price, stockStatus)
  
  console.log('ItemId', itemId, 'Price', price, 'Stock', stockStatus)
}

module.exports = {
  patrolBase
}