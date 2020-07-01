const mysql = require('mysql')
const fs = require('fs')
const currency = require('currency.js')

const getItemPricesSql = fs.readFileSync(__dirname + '/sql/getItemPrices.sql').toString()

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

const stores = [
  "patrol_base",
  "surplus_store",
  "redwolf_airsoft",
  "zero_one_airsoft",
  "airsoft_world",
  "land_warrior_airsoft",
  "fire_support",
  "wolf_armouries",
  "skirmshop",
  "bullseye_country_sport"
]

const getItemData = async (dbConnection, id) => {
  return new Promise(function(resolve, reject) {
    dbConnection.query(getItemPricesSql, id, function (error, results, fields) {
      if (error){
        console.log(error)
      }
      dbConnection.end(error => error ? reject(error) : resolve(JSON.stringify(results[0])));
    })
  })
}


const getItemPrices = async (dbConnection, id) => {
  let itemData = []
  let storeData = []
  const item = JSON.parse(await getItemData(dbConnection, id))

  itemData.push({
    item: {
      item_name: item.item_name,
      item_category: item.item_category,
      item_manufacturer: item.item_category,
      item_image: item.item_image,
      airsoft_stores: []
    }
  })

  stores.forEach(store => {
    let storeURL = store.replace(/_/g,"") + "_url"

    const GBP = value => currency(value, { symbol: "£", precision: 2 });
    const discount = GBP(item[`${store}_discount`]).format(true)

    if(item[storeURL]){
      storeData.push({
          store,
          item_price: item[`${store}_price`].replace('£',''),
          item_price_currency: item[`${store}_price`],
          item_stock: item[`${store}_stock`],
          item_on_sale: item[`${store}_sale`],
          item_discount: discount,
          item_url: item[storeURL]
      })
    }
  })
  storeData.sort((a, b) => parseFloat(a.item_price) - parseFloat(b.item_price));
  itemData[0].item.airsoft_stores.push(storeData)
  return itemData[0]
}

module.exports = {
  getDbConnection,
  getItemPrices
}