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

const getDetailsFromDB = async (dbConnection, limit, offset, category, manufacturer, getLength) => {
  return new Promise(async function(resolve, reject) {
    const details = await db.getDetails(dbConnection, limit, offset, category, manufacturer, getLength)
    
    resolve(details)
  })
}

const getDetails = async (categories, manufacturers) => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  const details = await getDetailsFromDB(dbConnection, categories, manufacturers)

  const detailsObject = []

  if(categories) {
    JSON.parse(details).map(detail => {
      detailsObject.push(detail.item_category)
    })
  } else if(manufacturers) {
    JSON.parse(details).map(detail => {
      detailsObject.push(detail.item_manufacturer)
    })
  }

  detailsObject.sort(function (a, b) {
    return a.localeCompare(b)
  })

  return detailsObject
}

module.exports = {
  getDetails
}