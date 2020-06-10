const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const airsoftWorldUrl = 'https://www.airsoftworld.net/'
        const url = airsoftWorldUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.product-type-data div.price-box').each(function(i, element) {
                const unfiltered = $(this).text()

                const filtered = unfiltered.replace(/\s/g, "")
                itemDetails.push(filtered)
            })
            if(itemDetails[0].includes('WAS:')) {
                const oldPrice = itemDetails[0].split("NOW");
                const oldPriceFormatted = oldPrice[0].replace("WAS:", "")

                const currentPrice = itemDetails[0].split("NOW");
                const currentPriceFormatted = currentPrice[1].replace(":", "")

                const oldPriceFloatFormatted = oldPriceFormatted.replace("£", "")
                const oldPriceFloat = parseFloat(oldPriceFloatFormatted)

                const currentPriceFloatFormatted = currentPriceFormatted.replace("£", "")
                const currentPriceFloat = parseFloat(currentPriceFloatFormatted)

                const difference = oldPriceFloat - currentPriceFloat
                const discount = parseFloat(difference.toFixed(2))

                itemDetails.splice(0,1)
                itemDetails.push(currentPriceFormatted)
                itemDetails.push(1)
                itemDetails.push(discount)
            } else {
                itemDetails.push(0)
                itemDetails.push(0)
            }
            $('div.availability').each(function(i, element) {
                const stock = $(this).text()
                if(stock == "In Stock"){
                    itemDetails.push(stock)
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