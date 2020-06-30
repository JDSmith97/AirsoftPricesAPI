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

const getAllItemsFromDB = async (dbConnection, limit, offset, category, manufacturer, getLength) => {
  return new Promise(async function(resolve, reject) {
    const allItems = await db.getAllItems(dbConnection, limit, offset, category, manufacturer, getLength)
    
    resolve(allItems)
  })
}

const getItems = async (limit, offset, category, manufacturer, getLength) => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  const items = await getAllItemsFromDB(dbConnection, limit, offset, category, manufacturer, getLength)

  return items
}

module.exports = {
  getItems
}