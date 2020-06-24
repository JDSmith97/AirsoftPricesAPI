const mysql = require('mysql')
const fs = require('fs')

const getAirsoftWorldDealsSql = fs.readFileSync(__dirname + '/sql/getAirsoftWorldDeals.sql').toString()
const getBullseyeDealsSql = fs.readFileSync(__dirname + '/sql/getBullseyeDeals.sql').toString()
const getFireSupportDealsSql = fs.readFileSync(__dirname + '/sql/getFireSupportDeals.sql').toString()
const getLandWarriorDealsSql = fs.readFileSync(__dirname + '/sql/getLandWarriorDeals.sql').toString()
const getPatrolBaseDealsSql = fs.readFileSync(__dirname + '/sql/getPatrolBaseDeals.sql').toString()
const getRedwolfAirsoftDealsSql = fs.readFileSync(__dirname + '/sql/getRedwolfAirsoftDeals.sql').toString()
const getSkirmshopDealsSql = fs.readFileSync(__dirname + '/sql/getSkirmshopDeals.sql').toString()
const getSurplusDealsSql = fs.readFileSync(__dirname + '/sql/getSurplusDeals.sql').toString()
const getWolfArmouriesDealsSql = fs.readFileSync(__dirname + '/sql/getWolfArmouriesDeals.sql').toString()
const getZeroOneDealsSql = fs.readFileSync(__dirname + '/sql/getZeroOneDeals.sql').toString()

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

const getAirsoftWorldDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getAirsoftWorldDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getBullseyeDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getBullseyeDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getFireSupportDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getFireSupportDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getLandWarriorDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getLandWarriorDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getPatrolBaseDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getPatrolBaseDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getRedwolfAirsoftDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getRedwolfAirsoftDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getSkirmshopDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getSkirmshopDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getSurplusDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getSurplusDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getWolfArmouriesDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getWolfArmouriesDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      resolve(JSON.stringify(results))
    })
  })
}

const getZeroOneDeals = async (dbConnection) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getZeroOneDealsSql, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      dbConnection.end(error => error ? reject(error) : resolve(JSON.stringify(results)))
    })
  })
}

const getDeals = async (dbConnection) => {
  return new Promise(async function(resolve, reject) {
    let topDeals = []
    const airsoftWorld = await getAirsoftWorldDeals(dbConnection)
    const topDealsPush = (deal, store) => {
      return  topDeals.push({
        item_id: deal.item_id,
        item_price: deal.item_price,
        item_discount: deal.item_discount,
        item_name: deal.item_name,
        item_image: deal.item_image,
        store: store
      })
    }
    JSON.parse(airsoftWorld).forEach(deal => {
      topDealsPush(deal, 'AirsoftWorld')
    })
    const bullseye = await getBullseyeDeals(dbConnection)
    JSON.parse(bullseye).forEach(deal => {
      topDealsPush(deal, 'BullseyeCountrySport')
    })
    const fireSupport = await getFireSupportDeals(dbConnection)
    JSON.parse(fireSupport).forEach(deal => {
      topDealsPush(deal, 'FireSupport')
    })
    const landWarrior = await getLandWarriorDeals(dbConnection)
    JSON.parse(landWarrior).forEach(deal => {
      topDealsPush(deal, 'LandWarrior')
    })
    const patrolBase = await getPatrolBaseDeals(dbConnection)
    JSON.parse(patrolBase).forEach(deal => {
      topDealsPush(deal, 'PatrolBase')
    })
    const redwolfAirsoft = await getRedwolfAirsoftDeals(dbConnection)
    JSON.parse(redwolfAirsoft).forEach(deal => {
      topDealsPush(deal, 'RedwolfAirsoft')
    })
    const skirmshop = await getSkirmshopDeals(dbConnection)
    JSON.parse(skirmshop).forEach(deal => {
      topDealsPush(deal, 'Skirmshop')
    })
    const surplus = await getSurplusDeals(dbConnection)
    JSON.parse(surplus).forEach(deal => {
      topDealsPush(deal, 'Surplus')
    })
    const wolfArmouries = await getWolfArmouriesDeals(dbConnection)
    JSON.parse(wolfArmouries).forEach(deal => {
      topDealsPush(deal, 'WolfArmouries')
    })
    const zeroOne = await getZeroOneDeals(dbConnection)
    JSON.parse(zeroOne).forEach(deal => {
      topDealsPush(deal, 'ZeroOne')
    })
    topDeals.sort(function(a, b) {
      return parseFloat(a.item_discount) - parseFloat(b.item_discount);
    });
    topDeals.reverse()
    resolve(topDeals.slice(0, 5))
  })
}

module.exports = {
  getDbConnection,
  getDeals
}