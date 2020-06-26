const getPrices = require('./getPrices')

module.exports.handler = async function (event, context, callback) {
  try {
    await getPrices.getItemPrices()
    callback(null, "All scraped")
  }
  catch(err) {
    console.log(err)
  }
}