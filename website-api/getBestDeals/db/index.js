const mysql = require('mysql')
const fs = require('fs')
const currency = require('currency.js')
const { Convert } = require("easy-currencies")

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

    const GBP = value => currency(value, { symbol: "£", precision: 2 })
    const EUR = value => currency(value, { symbol: "€", precision: 2 });

    const topDealsPush = async (deal, store) => {
      if(deal.item_price.includes('£')){
        const discount = GBP(deal.item_discount).format(true)

        const discountValue = await Convert(deal.item_discount)
          .from("GBP")
          .to("EUR")

        const discountEUR = EUR(discountValue).format(true)

        const priceValue = await Convert(deal.item_price.replace('£',''))
          .from("GBP")
          .to("EUR")

        const priceEUR = EUR(priceValue).format(true)

        // await Promise.all([discountValue, priceValue]).then((values) => {
        //   const discountEUR = EUR(values[0]).format(true)
        //   const priceEUR = EUR(values[1]).format(true)

        return topDeals.push({
          item_id: deal.item_id,
          item_price_gbp: deal.item_price,
          item_price_eur: priceEUR,
          item_discount_gbp: discount,
          item_discount_eur: discountEUR,
          item_discount: deal.item_discount,
          item_name: deal.item_name,
          item_image: deal.item_image,
          store: store
        })
      }

      if(deal.item_price.includes('€')){
        const discount = EUR(deal.item_discount).format(true)

        const discountValue = await Convert(deal.item_discount)
          .from("EUR")
          .to("GBP")

        const discountGBP = GBP(discountValue).format(true)

        const priceValue = await Convert(deal.item_price.replace('€',''))
          .from("EUR")
          .to("GBP")

        const priceGBP = GBP(priceValue).format(true)

        let discountInGBP = await Convert(deal.item_discount)
          .from("EUR")
          .to("GBP")
        
        discountInGBP = discountInGBP.toFixed(2)

        await Promise.all([discountValue, priceValue, priceGBP]).then((values) => {
          console.log(values)
        })

        return topDeals.push({
          item_id: deal.item_id,
          item_price_gbp: priceGBP,
          item_price_eur: deal.item_price,
          item_discount_gbp: discountGBP,
          item_discount_eur: discount,
          item_discount: discountInGBP,
          item_name: deal.item_name,
          item_image: deal.item_image,
          store: store
        })
      }
    }

    for(const deal of JSON.parse(airsoftWorld)) {
      await topDealsPush(deal, 'AirsoftWorld')
    }
    const bullseye = await getBullseyeDeals(dbConnection)
    for(const deal of JSON.parse(bullseye)) {
      await topDealsPush(deal, 'BullseyeCountrySport')
    }
    const fireSupport = await getFireSupportDeals(dbConnection)
    for(const deal of JSON.parse(fireSupport)) {
      await topDealsPush(deal, 'FireSupport')
    }
    const landWarrior = await getLandWarriorDeals(dbConnection)
    for(const deal of JSON.parse(landWarrior)) {
      await topDealsPush(deal, 'LandWarrior')
    }
    const patrolBase = await getPatrolBaseDeals(dbConnection)
    for(const deal of JSON.parse(patrolBase)) {
      await topDealsPush(deal, 'PatrolBase')
    }
    const redwolfAirsoft = await getRedwolfAirsoftDeals(dbConnection)
    for(const deal of JSON.parse(redwolfAirsoft)) {
      await topDealsPush(deal, 'RedwolfAirsoft')
    }
    const skirmshop = await getSkirmshopDeals(dbConnection)
    for(const deal of JSON.parse(skirmshop)) {
      await topDealsPush(deal, 'Skirmshop')
    }
    const surplus = await getSurplusDeals(dbConnection)
    for(const deal of JSON.parse(surplus)) {
      await topDealsPush(deal, 'Surplus')
    }
    const wolfArmouries = await getWolfArmouriesDeals(dbConnection)
    for(const deal of JSON.parse(wolfArmouries)) {
      await topDealsPush(deal, 'WolfArmouries')
    }
    const zeroOne = await getZeroOneDeals(dbConnection)
    for(const deal of JSON.parse(zeroOne)) {
      await topDealsPush(deal, 'ZeroOne')
    }
    topDeals.sort(function(a, b) {
      return parseFloat(a.item_discount) - parseFloat(b.item_discount)
    });
    topDeals.reverse()
    resolve(topDeals.slice(0,3))
  })
}

module.exports = {
  getDbConnection,
  getDeals
}