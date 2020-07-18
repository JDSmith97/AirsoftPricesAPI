const mysql = require('mysql')
const fs = require('fs')
const currency = require('currency.js')
const AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-2'})
const ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})

const itemsSql = fs.readFileSync(__dirname + '/sql/getAllItems.sql').toString()
const bestPriceSql = fs.readFileSync(__dirname + '/sql/getBestPrice.sql').toString()

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

const getExchangeRates = async () => {
  return new Promise(async function(resolve, reject) {
    const EURtoGBPRate = []
    const GBPtoEURRate = []

    const EURtoGBP = {
      TableName: 'airsoftPrices-exchangeRates', 
      Key: {
        'currency': 'EURtoGBP'
      }
    }

    const GBPtoEUR = {
      TableName: 'airsoftPrices-exchangeRates', 
      Key: {
        'currency': 'GBPtoEUR'
      }
    }

    try {
      const GBPData = await ddb.get(EURtoGBP).promise()
      EURtoGBPRate.push(GBPData)

    } catch (err) {
      console.log("Failure", err.message)
    }

    try {
      const EURData = await ddb.get(GBPtoEUR).promise()
      GBPtoEURRate.push(EURData)
      
    } catch (err) {
      console.log("Failure", err.message)
    }

    resolve([EURtoGBPRate, GBPtoEURRate])
  })
}

const getItems = (dbConnection, category, manufacturer) => {
  return new Promise(function(resolve, reject) {
    if(!category && !manufacturer){ 
      dbConnection.query(itemsSql, ['%','%'], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    } else if (!category) {
      dbConnection.query(itemsSql, ['%', manufacturer], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    } else if (!manufacturer) {
      dbConnection.query(itemsSql, [category, '%'], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    } else {
      dbConnection.query(itemsSql, [category, manufacturer], function (error, results, fields) {
        if (error){
          console.log(error)
        }
        resolve(JSON.stringify(results))
      })
    }
  })
}

const replacePrice = (price) => {
  if (price){
    const newPrice = parseFloat(price.replace(/[^\.\d]/g, ''))
    return newPrice
  } else {
    return null
  }
}

const getBestPrice = (dbConnection, item) => {
  const priceData = []
  return new Promise(function(resolve, reject) {
    dbConnection.query(bestPriceSql, item, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      const prices = JSON.stringify(results[0])
      const pricesJSON = JSON.parse(prices)

      priceData.push(
        {
          price: replacePrice(pricesJSON.patrol_base_price),
          price_currency: pricesJSON.patrol_base_price,
          discount: pricesJSON.patrol_base_discount
        },
        {
          price: replacePrice(pricesJSON.surplus_store_price),
          price_currency: pricesJSON.surplus_store_price,
          discount: pricesJSON.surplus_store_discount
        },
        {
          price: replacePrice(pricesJSON.redwolf_airsoft_price),
          price_currency: pricesJSON.redwolf_airsoft_price,
          discount: pricesJSON.redwolf_airsoft_discount
        },
        {
          price: replacePrice(pricesJSON.zero_one_airsoft_price),
          price_currency: pricesJSON.zero_one_airsoft_price,
          discount: pricesJSON.zero_one_airsoft_discount
        },
        {
          price: replacePrice(pricesJSON.airsoft_world_price),
          price_currency: pricesJSON.airsoft_world_price,
          discount: pricesJSON.airsoft_world_discount
        },
        {
          price: replacePrice(pricesJSON.land_warrior_airsoft_price),
          price_currency: pricesJSON.land_warrior_airsoft_price,
          discount: pricesJSON.land_warrior_airsoft_discount
        },
        {
          price: replacePrice(pricesJSON.fire_support_price),
          price_currency: pricesJSON.fire_support_price,
          discount: pricesJSON.fire_support_discount
        },
        {
          price: replacePrice(pricesJSON.wolf_armouries_price),
          price_currency: pricesJSON.wolf_armouries_price,
          discount: pricesJSON.wolf_armouries_discount
        },
        {
          price: replacePrice(pricesJSON.skirmshop_price),
          price_currency: pricesJSON.skirmshop_price,
          discount: pricesJSON.skirmshop_discount
        },
        {
          price: replacePrice(pricesJSON.bullseye_country_sport_price),
          price_currency: pricesJSON.bullseye_country_sport_price,
          discount: pricesJSON.bullseye_country_sport_discount
        }
      )
      priceData.sort(function(a, b) {
        return (a.price===null)-(b.price===null) || +(a.price>b.price)||-(a.price<b.price);
      })
      resolve(priceData[0])
    })
  })
}

const getAllItemsFromDB = async (dbConnection, category, manufacturer) => {
  return getItems(dbConnection, category, manufacturer)
}

const getAllItems = async (dbConnection, limit, offset, category, manufacturer, getLength) => {
  return new Promise(async function(resolve, reject) {
    let allItems = []
    const exchangeRates = await getExchangeRates()

    const allItemsPush = (item, bestPrice) => {

      const GBP = value => currency(value, { symbol: "£", precision: 2 })
      const EUR = value => currency(value, { symbol: "€", precision: 2 })

      if(bestPrice.price_currency && bestPrice.price_currency.includes('£')) {
        const discount = GBP(bestPrice.discount).format(true)

        const discountValue = bestPrice.discount * exchangeRates[1][0].Item.rate
        const discountEUR = EUR(discountValue).format(true)

        const priceValue = bestPrice.price * exchangeRates[1][0].Item.rate
        const priceEUR = EUR(priceValue).format(true)

        return  allItems.push({
          item_id: item.item_id,
          item_price_gbp: bestPrice.price_currency,
          item_price_eur: priceEUR,
          item_discount_gbp: discount,
          item_discount_eur: discountEUR,
          item_discount: bestPrice.discount,
          item_name: item.item_name,
          item_image: item.item_image
        })
      }

      if(bestPrice.price_currency && bestPrice.price_currency.includes('€')) {
        const discount = EUR(bestPrice.discount).format(true)

        const discountValue = bestPrice.discount * exchangeRates[0][0].Item.rate
        const discountGBP = GBP(discountValue).format(true)

        const priceValue = bestPrice.price * exchangeRates[0][0].Item.rate
        const priceGBP = GBP(priceValue).format(true)

        let discountInGBP = discountValue
        discountInGBP = parseFloat(discountInGBP.toFixed(2))


        return  allItems.push({
          item_id: item.item_id,
          item_price_gbp: priceGBP,
          item_price_eur: bestPrice.price_currency,
          item_discount_gbp: discountGBP,
          item_discount_eur: discount,
          item_discount: discountInGBP,
          item_name: item.item_name,
          item_image: item.item_image
        })
      }
    }
    const items = await getAllItemsFromDB(dbConnection, category, manufacturer)
    JSON.parse(items).forEach(async item => {
      const bestPrice = await getBestPrice(dbConnection, item.item_id)
      allItemsPush(item, bestPrice)
    })
    await closeDbConnection(dbConnection)
    allItems.sort(function (a, b) {
      return a.item_name.localeCompare(b.item_name)
    })
    if(getLength){
      resolve(allItems.length)
    } if(!limit){
      resolve(allItems)
    } else {
      resolve(allItems.slice(offset, offset+limit))
    }
  })
}

module.exports = {
  getDbConnection,
  getAllItems
}