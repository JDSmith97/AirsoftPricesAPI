const getPrices = require('./getPrices')

const test = function (event, context, callback) {
  getPrices.getItemPrices()
}

test()
