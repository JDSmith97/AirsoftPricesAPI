const db = require('./../db')
const ssm = require('./../ssm')
const patrolBase = require('./webScrapers/patrolbase')
const surplusStore = require('./webScrapers/surplusstore')
const insertPrice = require('./../insertPrices')

const getDbCreds = async () => {
  const dbCreds = await ssm.ssmConfig()
  return dbCreds
}

const getDbConnection = async (dbCreds) => {
  const dbConnection = await db.getDbConnection(dbCreds)
  return dbConnection
}

const getItemPricePatrolBase = async (dbConnection) => {
  let items = await db.getItems(dbConnection)

  JSON.parse(items).forEach(async item => {
    if(item.patrolbase_url != null) {
      const price = await patrolBase.getItemPrice(item.patrolbase_url)
      console.log('Patrol Base', item.item_id, price)
      if(price.length == 4) {
        await insertPrice.patrolBase(dbConnection, item.item_id, price)
      }
    }
  })
}

const getItemPriceSurplusStore = async (dbConnection) => {
  let items = await db.getItems(dbConnection)

  JSON.parse(items).forEach(async item => {
    if(item.surplusstore_url != null) {
      const price = await surplusStore.getItemPrice(item.surplusstore_url)
      console.log('Surplus Store', item.item_id, price)
      if(price.length == 4) {
        await insertPrice.surplusStore(dbConnection, item.item_id, price)
      }
    }
  })
}

const getItemPrices = async () => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  await getItemPricePatrolBase(dbConnection)
  await getItemPriceSurplusStore(dbConnection)
}

module.exports = {
  getItemPrices
}