const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const surplusStoreUrl = 'https://surplusstore.co.uk/'
        const url = surplusStoreUrl + productUrl

        axios.get(url)
        .then(async response => new Promise(resolve => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.product-info-price div.price-box.price-final_price span.price-container span.price').each(function(i, element) {
                const price = $(this).text()
                itemDetails.push(price)
            })
            if(itemDetails.length > 1) {
                const newPrice = itemDetails[0].replace("£", "")
                const newPriceFloat = parseFloat(newPrice)

                const oldPrice = itemDetails[1].replace("£", "")
                const oldPriceFloat = parseFloat(oldPrice)

                const difference = oldPriceFloat - newPriceFloat
                const discount = parseFloat(difference.toFixed(2))

                itemDetails.splice(1,2)
                itemDetails.push(1, discount)
            } else {
                itemDetails.push(0, 0)
            }
            $('div.stock.available span').each(function(i, element) {
                itemDetails.push('In Stock')
            })
            if(itemDetails.length < 4) {
                itemDetails.push('Out of Stock')
            }
            
            setTimeout(() => {
                resolve(itemDetails)
            }, 2000)
        }))
        .catch(error => {
            console.log(error)
        })  
    })
}

module.exports = {
    getItemPrice
}