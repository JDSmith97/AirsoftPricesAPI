const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const landWarriorAirsoftUrl = 'https://www.landwarriorairsoft.com/'
        const url = landWarriorAirsoftUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('span.price_break span.price span.inc span.GBP').each(function(i, element) {
                const unfiltered = $(this).text()

                const filtered = unfiltered.replace(/\s/g, "")
                itemDetails.push(filtered)
                itemDetails.push(0)
                itemDetails.push(0)
            })
            $('#product_stock_info span.product_stock_level').each(function(i, element) {
                const stock = $(this).text()
                var stockInt = parseInt(stock)
                if(stockInt > 0){
                    itemDetails.push('In Stock')
                } else {
                    itemDetails.push('Out of Stock')
                }
            })
            resolve(itemDetails)
        })
        .catch(error => {
            console.log(error)
        })  
    })
}

module.exports = {
    getItemPrice
}