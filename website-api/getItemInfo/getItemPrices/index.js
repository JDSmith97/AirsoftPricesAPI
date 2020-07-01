const ssm = require('./../ssm')
const db = require('./../db')

const getDbCreds = async () => {
  const dbCreds = await ssm.ssmConfig()
  return dbCreds
}

const getDbConnection = async (dbCreds) => {
  const dbConnection = await db.getDbConnection(dbCreds)
  return dbConnection
}

const getAllItemPrices = async (dbConnection, id) => {
  return new Promise(async function(resolve, reject) {
    const itemPrices = await db.getItemPrices(dbConnection, id)
    
    resolve(itemPrices)
  })
}

const getPrices = async (id) => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  const allItemPrices = await getAllItemPrices(dbConnection, id)
  return allItemPrices
}

module.exports = {
  getPrices
}