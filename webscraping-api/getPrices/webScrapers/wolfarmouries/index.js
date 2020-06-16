const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const wolfArmouriesUrl = 'https://wolfarmouries.co.uk/'
        const url = wolfArmouriesUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.add-to-cart-wrapper span.price-including-tax span.price').each(function(i, element) {
                const unfiltered = $(this).text()
                const filtered = unfiltered.replace(/\s/g, "")

                itemDetails.push(filtered)
            })
            if($('div.add-to-cart-wrapper p.old-price').length){
                $('div.add-to-cart-wrapper p.old-price span.price').each(function(i, element) {
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
            $('p.availability span.value').each(function(i, element) {
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