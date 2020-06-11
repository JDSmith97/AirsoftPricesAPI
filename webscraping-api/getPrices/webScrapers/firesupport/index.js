const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const fireSupportUrl = 'https://www.fire-support.co.uk/'
        const url = fireSupportUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('span.showproductprice').each(function(i, element) {
                const unfiltered = $(this).text()
                const filtered = unfiltered.replace(/\s/g, "")

                const currentPrice = filtered.split("Price:")

                itemDetails.push(currentPrice[1])
                itemDetails.push(0)
                itemDetails.push(0)
            })
            $('div.showstockqty').each(function(i, element) {
                const stock = $(this).text()
                const filtered = stock.replace(/\s/g, "")

                const stockStatus = filtered.split("QtyInStock:")
                if(stockStatus[1] == 'OutofStock'){
                    itemDetails.push('Out of Stock')
                } else {
                    itemDetails.push('In Stock')
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