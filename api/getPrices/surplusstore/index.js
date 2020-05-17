const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const surplusStoreUrl = 'https://www.surplusstore.co.uk/tokyo-marui-resident-evil-lightning-hawk.html'
        const url = surplusStoreUrl + productUrl

        axios.get(surplusStoreUrl)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.product-shop div.price-box span.regular-price span.price').each(function(i, element) {
                itemDetails.push($(this).text())
            })
            $('p.availability.in-stock span').each(function(i, element) {
                itemDetails.push($(this).text())
            })
            console.log(itemDetails)
            resolve(itemDetails)
        })
        .catch(error => {
            reject(error)
        })  
    })
}

getItemPrice()

module.exports = {
    getItemPrice
}