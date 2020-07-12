const axios = require('axios')
const { insertRates } = require('../db')

const getEURRate = async () => {
  return new Promise(function(resolve, reject) {
    axios.get('https://api.exchangeratesapi.io/latest?base=GBP')
      .then(async response => {
        resolve(response.data.rates.EUR)
      })
  })
}

const getGBPRate = async () => {
  return new Promise(function(resolve, reject) {
    axios.get('https://api.exchangeratesapi.io/latest?base=EUR')
      .then(async response => {
        resolve(response.data.rates.GBP)
      })
  })
}

const getRates = async () => {
  const EUR = await getEURRate()
  const GBP = await getGBPRate()

  await insertRates(EUR, GBP)
}

module.exports = {
  getRates
}