const getItemPrices = require('./getItemPrices')

module.exports.handler = async function (event, context, callback) {
  try {
    let id = event.queryStringParameters.id
    const itemPrices = await getItemPrices.getPrices(id)

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(itemPrices)
    };

    callback(null, response);
  }
  catch(err) {
    console.log(err)
  }
}
