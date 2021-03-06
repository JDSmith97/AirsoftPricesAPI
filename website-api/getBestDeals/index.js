const getBestDeals = require('./getBestDeals')

module.exports.handler = async function (event, context, callback) {
  try {
    const items = await getBestDeals.getDeals()

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: items
    };
    
    callback(null, response);
  }
  catch(err) {
    console.log(err)
  }
}