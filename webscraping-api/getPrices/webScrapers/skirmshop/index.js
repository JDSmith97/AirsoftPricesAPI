const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const skirmshopUrl = 'https://www.skirmshop.co.uk/'
        const url = skirmshopUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.price-wrap span.price').each(function(i, element) {
                const unfiltered = $(this).text()
                const filtered = unfiltered.replace(/\s/g, "")

                itemDetails.push(filtered)
            })
            if($('div.price-wrap span.old-price').length){
                $('div.price-wrap span.old-price').each(function(i, element) {
                    const unfiltered = $(this).text()
                    const filtered = unfiltered.replace(/\s/g, "")
                    
                    const oldPrice = filtered.replace("£","")
                    const oldPriceFloat = parseFloat(oldPrice)

                    const newPrice = itemDetails[0].replace("£","")
                    const newPriceFloat = parseFloat(newPrice)

                    const difference = oldPriceFloat - newPriceFloat

                    itemDetails.push(1, difference)
                })
            } else {
                itemDetails.push(0,0)
            }
            $('table.details tr.availability span').each(function(i, element) {
                const stock = $(this).text()

                if(stock == 'In stock'){
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