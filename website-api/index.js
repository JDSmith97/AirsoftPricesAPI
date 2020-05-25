const getItemPrices = require('./getItemPrices')

module.exports.handler = async function (event, context, callback) {
  try {
    let id = event.queryStringParameters.id
    const itemPrices = await getItemPrices.getPrices(id)
    context.succeed({
      "statusCode": 200,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": JSON.stringify(itemPrices),
        "isBase64Encoded": false
    });
  }
  catch(err) {
    console.log(err)
  }
}
