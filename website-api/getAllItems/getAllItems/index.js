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

const getAllItemsFromDB = async (dbConnection) => {
  return new Promise(async function(resolve, reject) {
    const allItems = await db.getItems(dbConnection)
    
    // console.log(allItems)
    resolve(JSON.parse(allItems))
  })
}

const getItems = async () => {
  const dbCreds = await getDbCreds()
  const dbConnection = await getDbConnection(dbCreds)
  const items = await getAllItemsFromDB(dbConnection)

  let allItems = []

  items.forEach(item => {
    let itemFormat = {
      name: item.item_name,
      id: item.item_id
    }

    allItems.push(itemFormat)
  });
  console.log(allItems)
  return allItems
}

module.exports = {
  getItems
}