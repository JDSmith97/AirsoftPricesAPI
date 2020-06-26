const getPrices = require('./getPrices')

const test = async function (event, context, callback) {
  try {
    const scraper = await getPrices.getItemPrices()
    console.log(scraper)
    callback(null, scraper)
  }
  catch(err) {
    console.log(err)
  }
}
test()