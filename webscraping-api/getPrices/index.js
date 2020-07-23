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

const insertPrices = async (dbCreds, store) => {
  let items = await db.getItems(dbCreds)
  const data = webscrappers[store]

  for(let item of JSON.parse(items)){
    if(item[`${store}_url`] != null) {
      const price = await data.webscrapper.getItemPrice(item[`${store}_url`])
      console.log(store, item.item_id, price)
      if(price.length == 4) {
        await data.price(dbCreds, item.item_id, price)
      }
    }
  }

  // JSON.parse(items).forEach(async item => {
  //   if(item[`${store}_url`] != null) {
  //     const price = await data.webscrapper.getItemPrice(item[`${store}_url`])
  //     console.log(store, item.item_id, price)
  //     if(price.length == 4) {
  //       await data.price(dbCreds, item.item_id, price)
  //     }
  //   }
  // })

  return ('done')
}

const getItemPricePatrolBase = async (dbCreds) => {
  const insert = await insertPrices(dbCreds, "patrolbase")
  return insert
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
  const insert = await insertPrices(dbConnection, "airsoftworld")
  return insert
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

const insertStorePrices = async (pool) => {
  await getItemPricePatrolBase(pool)
  // await getItemPriceSurplusStore(pool)
  // await getItemPriceRedwolfAirsoft(pool) 
  // await getItemPriceZeroOneAirsoft(pool)
  await getItemPriceAirsoftWorld(pool)
  // await getItemPriceLandWarriorAirsoft(pool)
  // await getItemPriceFireSupport(pool)
  // await getItemPriceWolfArmouries(pool)
  // await getItemPriceSkirmshop(pool)
  // await getItemPriceBullseyeCountrySport(pool)

  return ('done')
}

const getItemPrices = async () => {
  return new Promise(async function(resolve, reject) {
    const dbCreds = await getDbCreds()
    const pool = await db.getDbConnection(dbCreds)

    const storePrices = await insertStorePrices(pool)

    console.log(storePrices)
    const closePool = await db.closeDbConnection(pool)
    resolve("All scraped")
  })
}

module.exports = {
  getItemPrices
}