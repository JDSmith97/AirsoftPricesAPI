const getPrices = require('./getPrices')

module.exports.handler = async function (event, context, callback) {
  try {
    const scraper = await getPrices.getItemPrices()
    callback(null, scraper)
  }
  catch(err) {
    console.log(err)
  }
}