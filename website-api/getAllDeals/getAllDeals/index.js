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

const getAllDealsFromDB = async (dbConnection) => {
  return new Promise(async function(resolve, reject) {
    const allItems = await db.getDeals(dbConnection)
    
    console.log(allItems)
    resolve(allItems)
  })
}

const getDeals = async () => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  const items = await getAllDealsFromDB(dbConnection)

  return items
}

module.exports = {
  getDeals
}