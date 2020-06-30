const mysql = require('mysql')
const fs = require('fs')
const currency = require('currency.js')

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
          discount: pricesJSON.patrol_base_discount
        },
        {
          price: replacePrice(pricesJSON.surplus_store_price),
          discount: pricesJSON.surplus_store_discount
        },
        {
          price: replacePrice(pricesJSON.redwolf_airsoft_price),
          discount: pricesJSON.redwolf_airsoft_discount
        },
        {
          price: replacePrice(pricesJSON.zero_one_airsoft_price),
          discount: pricesJSON.zero_one_airsoft_discount
        },
        {
          price: replacePrice(pricesJSON.airsoft_world_price),
          discount: pricesJSON.airsoft_world_discount
        },
        {
          price: replacePrice(pricesJSON.land_warrior_airsoft_price),
          discount: pricesJSON.land_warrior_airsoft_discount
        },
        {
          price: replacePrice(pricesJSON.fire_support_price),
          discount: pricesJSON.fire_support_discount
        },
        {
          price: replacePrice(pricesJSON.wolf_armouries_price),
          discount: pricesJSON.wolf_armouries_discount
        },
        {
          price: replacePrice(pricesJSON.skirmshop_price),
          discount: pricesJSON.skirmshop_discount
        },
        {
          price: replacePrice(pricesJSON.bullseye_country_sport_price),
          discount: pricesJSON.bullseye_country_sport_discount
        }
      )
      priceData.sort(function(a, b) {
        return (a.price===null)-(b.price===null) || +(a.price>b.price)||-(a.price<b.price);
      });
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
    const allItemsPush = (item, bestPrice) => {
      const GBP = value => currency(value, { symbol: "£", precision: 2 });
      const discount = GBP(bestPrice.discount).format(true)
      return  allItems.push({
        item_id: item.item_id,
        item_price: `£${bestPrice.price}`,
        item_discount_currency: discount,
        item_discount: bestPrice.discount,
        item_name: item.item_name,
        item_image: item.item_image
      })
    }
    const items = await getAllItemsFromDB(dbConnection, category, manufacturer)
    JSON.parse(items).forEach(async item => {
      const bestPrice = await getBestPrice(dbConnection, item.item_id)
      allItemsPush(item, bestPrice)
    })
    await closeDbConnection(dbConnection)
    allItems.sort(function (a, b) {
      return a.item_name.localeCompare(b.item_name);
    });
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