const getDetails = require('./getDetails')

module.exports.handler = async function (event, context, callback) {
  try {
    let allCategories = event.queryStringParameters.allCategories
    let allManufacturers = event.queryStringParameters.allManufacturers

    const details = await getDetails.getDetails(allCategories, allManufacturers)

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(details)
    }

    callback(null, response)
  }
  catch(err) {
    console.log(err)
  }
}
