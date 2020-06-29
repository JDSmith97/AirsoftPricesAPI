const getAllDeals = require('./getAllDeals')

module.exports.handler = async function (event, context, callback) {
  try {
    let limit = event.queryStringParameters.limit
    let offset = event.queryStringParameters.offset
    let category = event.queryStringParameters.category

    if(!category){
      category = 'none'
    }
    
    const items = await getAllDeals.getDeals(limit, offset, category)

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(items)
    };

    callback(null, response);
  }
  catch(err) {
    console.log(err)
  }
}