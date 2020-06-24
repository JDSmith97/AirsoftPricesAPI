const db = require('./../db')
const ssm = require('./../ssm')

const patrolBase = require('./webScrapers/patrolbase')
const surplusStore = require('./webScrapers/surplusstore')
const redwolfAirsoft = require('./webScrapers/redwolfairsoft')
const zeroOneAirsoft = require('./webScrapers/zerooneairsoft')
const airsoftWorld = require('./webScrapers/airsoftworld')
const landWarriorAirsoft = require('./webScrapers/landwarriorairsoft')
const fireSupport = require('./webScrapers/firesupport')
const wolfArmouries = require('./webScrapers/wolfarmouries')
const skirmshop = require('./webScrapers/skirmshop')
const bulleyesCountrySport = require('./webScrapers/bulleyescountrysport')


const insertPrice = require('./../insertPrices')

const getDbCreds = async () => {
  const dbCreds = await ssm.ssmConfig()
  return dbCreds
}

const getDbConnection = async (dbCreds) => {
  const dbConnection = await db.getDbConnection(dbCreds)
  return dbConnection
}

const webscrappers = {
  "patrolbase": {
    webscrapper: patrolBase,
    price: insertPrice.patrolBase
  },
  "surplusstore": {
    webscrapper: surplusStore,
    price: insertPrice.surplusStore
  },
  "redwolfairsoft": {
    webscrapper: redwolfAirsoft,
    price: insertPrice.redwolfAirsoft
  },
  "zerooneairsoft": {
    webscrapper: zeroOneAirsoft,
    price: insertPrice.zeroOneAirsoft
  },
  "airsoftworld": {
    webscrapper: airsoftWorld,
    price: insertPrice.airsoftWorld
  },
  "landwarriorairsoft": {
    webscrapper: landWarriorAirsoft,
    price: insertPrice.landWarriorAirsoft
  },
  "firesupport": {
    webscrapper: fireSupport,
    price: insertPrice.fireSupport
  },
  "wolfarmouries": {
    webscrapper: wolfArmouries,
    price: insertPrice.wolfArmouries
  },
  "skirmshop": {
    webscrapper: skirmshop,
    price: insertPrice.skirmshop
  },
  "bullseyecountrysport": {
    webscrapper: bulleyesCountrySport,
    price: insertPrice.bullseyeCountrySport
  }
}

const insertPrices = async (dbConnection, store) => {
  let items = await db.getItems(dbConnection)
  const data = webscrappers[store]

  JSON.parse(items).forEach(async item => {
    if(item[`${store}_url`] != null) {
      const price = await data.webscrapper.getItemPrice(item[`${store}_url`])
      console.log(store, item.item_id, price)
      if(price.length == 4) {
        await data.price(dbConnection, item.item_id, price)
      }
    }
  })
}

const getItemPricePatrolBase = async (dbConnection) => {
  insertPrices(dbConnection, "patrolbase")
}

const getItemPriceSurplusStore = async (dbConnection) => {
  insertPrices(dbConnection, "surplusstore")
}

const getItemPriceRedwolfAirsoft = async (dbConnection) => {
  insertPrices(dbConnection, "redwolfairsoft")
}

const getItemPriceZeroOneAirsoft = async (dbConnection) => {
  insertPrices(dbConnection, "zerooneairsoft")
}

const getItemPriceAirsoftWorld = async (dbConnection) => {
  insertPrices(dbConnection, "airsoftworld")
}

const getItemPriceLandWarriorAirsoft = async (dbConnection) => {
  insertPrices(dbConnection, "landwarriorairsoft")
}

const getItemPriceFireSupport = async (dbConnection) => {
  insertPrices(dbConnection, "firesupport")
}

const getItemPriceWolfArmouries = async (dbConnection) => {
  insertPrices(dbConnection, "wolfarmouries")
}

const getItemPriceSkirmshop = async (dbConnection) => {
  insertPrices(dbConnection, "skirmshop")
}

const getItemPriceBullseyeCountrySport = async (dbConnection) => {
  insertPrices(dbConnection, "bullseyecountrysport")
}

const getItemPrices = async () => {
    const dbCreds = await getDbCreds()
    const dbConnection = await getDbConnection(dbCreds)
    await getItemPricePatrolBase(dbConnection)
    // await getItemPriceSurplusStore(dbConnection)
    // await getItemPriceRedwolfAirsoft(dbConnection) 
    // await getItemPriceZeroOneAirsoft(dbConnection)
    // await getItemPriceAirsoftWorld(dbConnection)
    // await getItemPriceLandWarriorAirsoft(dbConnection)
    // await getItemPriceFireSupport(dbConnection)
    // await getItemPriceWolfArmouries(dbConnection)
    // await getItemPriceSkirmshop(dbConnection)
    // await getItemPriceBullseyeCountrySport(dbConnection)
}

module.exports = {
  getItemPrices
}