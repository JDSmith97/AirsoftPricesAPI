const db = require('./../db')
const patrolBase = require('./patrolbase')
const insertPrice = require('./../insertPrices')


const getItemPricePatrolBase = async () => {
  const items = await db.getItems()

  JSON.parse(items).forEach(async item => {
    const price = await patrolBase.getItemPrice(item.patrolbase_url)
    await insertPrice.patrolBase(item.item_id, price)
  })
}

getItemPricePatrolBase()