const db = require('./../db')
const patrolBase = require('./patrolbase')
const surplusStore = require('./surplusstore')
const insertPrice = require('./../insertPrices')


const getItemPricePatrolBase = async () => {
  const items = await db.getItems()

  JSON.parse(items).forEach(async item => {
    if(item.patrolbase_url != null) {
      const price = await patrolBase.getItemPrice(item.patrolbase_url)
      await insertPrice.patrolBase(item.item_id, price)
    }
  })
}

const getItemPriceSurplusStore = async () => {
  const items =  await db.getItems()

  JSON.parse(items).forEach(async item => {
    if(item.surplusstore_url != null) {
      const price = await surplusStore.getItemPrice(item.surplusstore_url)
      await insertPrice.surplusStore(item.item_id, price)
    }
  })
}

const getItemPrices = async () => {
  await getItemPricePatrolBase()
  await getItemPriceSurplusStore()
}

getItemPrices()