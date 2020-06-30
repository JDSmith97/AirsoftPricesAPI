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

const getAllDealsFromDB = async (dbConnection, limit, offset, category, manufacturer, getLength) => {
  return new Promise(async function(resolve, reject) {
    const allItems = await db.getDeals(dbConnection, limit, offset, category, manufacturer, getLength)
    
    resolve(allItems)
  })
}

const getDeals = async (limit, offset, category, manufacturer, getLength) => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  const items = await getAllDealsFromDB(dbConnection, limit, offset, category, manufacturer, getLength)

  return items
}

module.exports = {
  getDeals
}