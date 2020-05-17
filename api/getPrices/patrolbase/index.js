const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const patrolBaseUrl = 'https://www.patrolbase.co.uk/'
        const url = patrolBaseUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.content-block.detail-price span.price-formatted').each(function(i, element) {
                itemDetails.push($(this).text())
            })
            if(itemDetails.length > 1) {
                itemDetails.splice(1, 2)
                itemDetails.push(1)
            } else {
                itemDetails.push(0)
            }
            $('div.content-block.detail-stock-message div.stock-message script').each(function(i, element) {
                const stock = JSON.parse($(this).html())
                itemDetails.push(stock.stockMessage.displayName)
            })
            resolve(itemDetails)
        })
        .catch(error => {
            reject(error)
        })  
    })
}

module.exports = {
    getItemPrice
}