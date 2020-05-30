const getPrices = require('./getPrices')

module.exports.handler = function (event, context, callback) {
  getPrices.getItemPrices()
}
