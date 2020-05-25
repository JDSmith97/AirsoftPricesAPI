const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const surplusStoreUrl = 'https://www.surplusstore.co.uk/'
        const url = surplusStoreUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.product-shop div.price-box span').each(function(i, element) {
                const text = $(this).text()
                const removedSpaces = text.replace(/\s/g, "")
                const removedNewLines = removedSpaces.replace("\n", "")
                itemDetails.push(removedNewLines)
            })
            itemDetails.splice(0,1)
            if(itemDetails.length > 1) {
                itemDetails.splice(1,2)
                itemDetails.push(1)
            } else {
                itemDetails.push(0)
            }
            $('p.availability.in-stock span').each(function(i, element) {
                itemDetails.push($(this).text())
            })
            if(itemDetails.length < 3) {
                itemDetails.push('Out of Stock')
            }
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