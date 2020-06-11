const db = require('./../db')
const ssm = require('./../ssm')
const patrolBase = require('./webScrapers/patrolbase')
const surplusStore = require('./webScrapers/surplusstore')
const redwolfAirsoft = require('./webScrapers/redwolfairsoft')
const zeroOneAirsoft = require('./webScrapers/zerooneairsoft')
const airsoftWorld = require('./webScrapers/airsoftworld')
const landWarriorAirsoft = require('./webScrapers/landwarriorairsoft')
const fireSupport = require('./webScrapers/firesupport')
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

const getItemPriceRedwolfAirsoft = async (dbConnection) => {
  let items = await db.getItems(dbConnection)

  JSON.parse(items).forEach(async item => {
    if(item.redwolfairsoft_url != null) {
      const price = await redwolfAirsoft.getItemPrice(item.redwolfairsoft_url)
      console.log('Redwolf Airsoft', item.item_id, price)
      if(price.length == 4) {
        await insertPrice.redwolfAirsoft(dbConnection, item.item_id, price)
      }
    }
  })
}

const getItemPriceZeroOneAirsoft = async (dbConnection) => {
  let items = await db.getItems(dbConnection)

  JSON.parse(items).forEach(async item => {
    if(item.zerooneairsoft_url != null) {
      const price = await zeroOneAirsoft.getItemPrice(item.zerooneairsoft_url)
      console.log('Zero One Airsoft', item.item_id, price)
      if(price.length == 4) {
        await insertPrice.zeroOneAirsoft(dbConnection, item.item_id, price)
      }
    }
  })
}

const getItemPriceAirsoftWorld = async (dbConnection) => {
  let items = await db.getItems(dbConnection)

  JSON.parse(items).forEach(async item => {
    if(item.airsoftworld_url != null) {
      const price = await airsoftWorld.getItemPrice(item.airsoftworld_url)
      console.log('Airsoft World', item.item_id, price)
      if(price.length == 4) {
        await insertPrice.airsoftWorld(dbConnection, item.item_id, price)
      }
    }
  })
}

const getItemPriceLandWarriorAirsoft = async (dbConnection) => {
  let items = await db.getItems(dbConnection)

  JSON.parse(items).forEach(async item => {
    if(item.landwarriorairsoft_url != null) {
      const price = await landWarriorAirsoft.getItemPrice(item.landwarriorairsoft_url)
      console.log('Land Warrior Airsoft', item.item_id, price)
      if(price.length == 4) {
        await insertPrice.landWarriorAirsoft(dbConnection, item.item_id, price)
      }
    }
  })
}

const getItemPriceFireSupport = async (dbConnection) => {
  let items = await db.getItems(dbConnection)

  JSON.parse(items).forEach(async item => {
    if(item.firesupport_url != null) {
      const price = await fireSupport.getItemPrice(item.firesupport_url)
      console.log('Fire Support', item.item_id, price)
      if(price.length == 4) {
        await insertPrice.fireSupport(dbConnection, item.item_id, price)
      }
    }
  })
}


const getItemPrices = async () => {
    const dbCreds = await getDbCreds()
    const dbConnection = await getDbConnection(dbCreds)
    // await getItemPricePatrolBase(dbConnection)
    // await getItemPriceSurplusStore(dbConnection)
    // await getItemPriceRedwolfAirsoft(dbConnection)
    // await getItemPriceZeroOneAirsoft(dbConnection)
    // await getItemPriceAirsoftWorld(dbConnection)
    // await getItemPriceLandWarriorAirsoft(dbConnection)
    await getItemPriceFireSupport(dbConnection)
}

module.exports = {
  getItemPrices
}