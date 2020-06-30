const mysql = require('mysql')
const fs = require('fs')
const currency = require('currency.js')

const getAirsoftWorldDealsSql = fs.readFileSync(__dirname + '/sql/getAllAirsoftWorldDeals.sql').toString()
const getBullseyeDealsSql = fs.readFileSync(__dirname + '/sql/getAllBullseyeDeals.sql').toString()
const getFireSupportDealsSql = fs.readFileSync(__dirname + '/sql/getAllFireSupportDeals.sql').toString()
const getLandWarriorDealsSql = fs.readFileSync(__dirname + '/sql/getAllLandWarriorDeals.sql').toString()
const getPatrolBaseDealsSql = fs.readFileSync(__dirname + '/sql/getAllPatrolBaseDeals.sql').toString()
const getRedwolfAirsoftDealsSql = fs.readFileSync(__dirname + '/sql/getAllRedwolfAirsoftDeals.sql').toString()
const getSkirmshopDealsSql = fs.readFileSync(__dirname + '/sql/getAllSkirmshopDeals.sql').toString()
const getSurplusDealsSql = fs.readFileSync(__dirname + '/sql/getAllSurplusDeals.sql').toString()
const getWolfArmouriesDealsSql = fs.readFileSync(__dirname + '/sql/getAllWolfArmouriesDeals.sql').toString()
const getZeroOneDealsSql = fs.readFileSync(__dirname + '/sql/getAllZeroOneDeals.sql').toString()

const getDbConnection = async (dbCreds) => {
  const dbConnection = mysql.createConnection({
    host     : dbCreds.db_host,
    user     : dbCreds.db_user,
    password : dbCreds.db_password,
    database : dbCreds.db_name
  })
  dbConnection.connect()

  return dbConnection
}

const closeDbConnection = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.end(error => error ? reject(error) : resolve("DB Connection ended"))
  })
}

const dealsSql = {
  "patrol_base": getPatrolBaseDealsSql,
  "surplus_store": getSurplusDealsSql,
  "redwolf_airsoft": getRedwolfAirsoftDealsSql,
  "zero_one_airsoft": getZeroOneDealsSql,
  "airsoft_world": getAirsoftWorldDealsSql,
  "land_warrior_airsoft": getLandWarriorDealsSql,
  "fire_support": getFireSupportDealsSql,
  "wolf_armouries": getWolfArmouriesDealsSql,
  "skirmshop": getSkirmshopDealsSql,
  "bullseye_country_sport": getBullseyeDealsSql
}

const getItemDeals = (dbConnection, store, category, manufacturer) => {
  return new Promise(function(resolve, reject) {
    if(!category && !manufacturer){ 
      dbConnection.query(dealsSql[store], ['%','%'], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    } else if (!category) {
      dbConnection.query(dealsSql[store], ['%', manufacturer], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    } else if (!manufacturer) {
      dbConnection.query(dealsSql[store], [category, '%'], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    } else {
      dbConnection.query(dealsSql[store], [category, manufacturer], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    }
  })
}

const getAirsoftWorldDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "airsoft_world", category, manufacturer)
}

const getBullseyeDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "bullseye_country_sport", category, manufacturer)
}

const getFireSupportDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "fire_support", category, manufacturer)
}

const getLandWarriorDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "land_warrior_airsoft", category, manufacturer)
}

const getPatrolBaseDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "patrol_base", category, manufacturer)
}

const getRedwolfAirsoftDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "redwolf_airsoft", category, manufacturer)
}

const getSkirmshopDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "skirmshop", category, manufacturer)
}

const getSurplusDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "surplus_store", category, manufacturer)
}

const getWolfArmouriesDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "wolf_armouries", category, manufacturer)
}

const getZeroOneDeals = async (dbConnection, category, manufacturer) => {
  return getItemDeals(dbConnection, "zero_one_airsoft", category, manufacturer)
}

const getDeals = async (dbConnection, limit, offset, category, manufacturer, getLength) => {
  return new Promise(async function(resolve, reject) {
    let allDeals = []
    const allDealsPush = (deal, store) => {
      const GBP = value => currency(value, { symbol: "£", precision: 2 });
      const discount = GBP(deal.item_discount).format(true)
      return  allDeals.push({
        item_id: deal.item_id,
        item_price: deal.item_price,
        item_discount_currency: discount,
        item_discount: deal.item_discount,
        item_name: deal.item_name,
        item_image: deal.item_image,
        store: store
      })
    }
    const airsoftWorld = await getAirsoftWorldDeals(dbConnection, category, manufacturer)
    JSON.parse(airsoftWorld).forEach(deal => {
      allDealsPush(deal, 'AirsoftWorld')
    })
    const bullseye = await getBullseyeDeals(dbConnection, category, manufacturer)
    JSON.parse(bullseye).forEach(deal => {
      allDealsPush(deal, 'BullseyeCountrySport')
    })
    const fireSupport = await getFireSupportDeals(dbConnection, category, manufacturer)
    JSON.parse(fireSupport).forEach(deal => {
      allDealsPush(deal, 'FireSupport')
    })
    const landWarrior = await getLandWarriorDeals(dbConnection, category, manufacturer)
    JSON.parse(landWarrior).forEach(deal => {
      allDealsPush(deal, 'LandWarrior')
    })
    const patrolBase = await getPatrolBaseDeals(dbConnection, category, manufacturer)
    JSON.parse(patrolBase).forEach(deal => {
      allDealsPush(deal, 'PatrolBase')
    })
    const redwolfAirsoft = await getRedwolfAirsoftDeals(dbConnection, category, manufacturer)
    JSON.parse(redwolfAirsoft).forEach(deal => {
      allDealsPush(deal, 'RedwolfAirsoft')
    })
    const skirmshop = await getSkirmshopDeals(dbConnection, category, manufacturer)
    JSON.parse(skirmshop).forEach(deal => {
      allDealsPush(deal, 'Skirmshop')
    })
    const surplus = await getSurplusDeals(dbConnection, category, manufacturer)
    JSON.parse(surplus).forEach(deal => {
      allDealsPush(deal, 'Surplus')
    })
    const wolfArmouries = await getWolfArmouriesDeals(dbConnection, category, manufacturer)
    JSON.parse(wolfArmouries).forEach(deal => {
      allDealsPush(deal, 'WolfArmouries')
    })
    const zeroOne = await getZeroOneDeals(dbConnection, category, manufacturer)
    JSON.parse(zeroOne).forEach(deal => {
      allDealsPush(deal, 'ZeroOne')
    })
    await closeDbConnection(dbConnection)
    allDeals.sort(function(a, b) {
      return parseFloat(a.item_discount) - parseFloat(b.item_discount);
    });
    allDeals.reverse()
    if(getLength){
      resolve(allDeals.length)
    } else {
      resolve(allDeals.slice(offset, offset+limit))
    }
  })
}

module.exports = {
  getDbConnection,
  getDeals
}