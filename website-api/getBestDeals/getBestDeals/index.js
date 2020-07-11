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

const getBestDealsFromDB = async (dbConnection) => {
  return new Promise(async function(resolve, reject) {
    const allItems = await db.getDeals(dbConnection)
    
    resolve(allItems)
  })
}

const getDeals = async () => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  const items = await getBestDealsFromDB(dbConnection)

  return items
}

module.exports = {
  getDeals
}