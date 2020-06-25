const getAllDeals = require('./getAllDeals')

module.exports.handler = async function (event, context, callback) {
  try {
    const items = await getAllDeals.getDeals()

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: items
    };
    console.log('response', response)
    callback(null, response);
  }
  catch(err) {
    console.log(err)
  }
}
