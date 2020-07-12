const getExchangeRates = require('./getExchangeRates')

module.exports.handler = async function (event, context, callback) {
  try {
    const exchangeRates = await getExchangeRates.getRates()
    callback(null, exchangeRates)
  }
  catch(err) {
    console.log(err)
  }
}