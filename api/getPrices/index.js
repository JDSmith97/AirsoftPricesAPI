const db = require('./../db')
const ssm = require('./../ssm')
const patrolBase = require('./webScrapers/patrolbase')
const surplusStore = require('./webScrapers/surplusstore')
const insertPrice = require('./../insertPrices')

const getDbCreds = async () => {
  const dbCreds = await ssm.ssmConfig()
  return dbCreds
}

const getItemPricePatrolBase = async (dbCreds) => {
  const items = await db.getItems(dbCreds)

  JSON.parse(items).forEach(async item => {
    if(item.patrolbase_url != null) {
      const price = await patrolBase.getItemPrice(item.patrolbase_url)
      if(price) {
        await insertPrice.patrolBase(dbCreds, item.item_id, price)
      }
    }
  })
}

const getItemPriceSurplusStore = async (dbCreds) => {
  const items = await db.getItems(dbCreds)

  JSON.parse(items).forEach(async item => {
    if(item.surplusstore_url != null) {
      const price = await surplusStore.getItemPrice(item.surplusstore_url)
      if(price) {
        await insertPrice.surplusStore(dbCreds, item.item_id, price)
      }
    }
  })
}

const getItemPrices = async () => {
  const dbCreds = await getDbCreds()
  await getItemPricePatrolBase(dbCreds)
  await getItemPriceSurplusStore(dbCreds)
}

module.exports = {
  getItemPrices
}