const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const bullseyeCountrySportUrl = 'https://www.bullseyecountrysport.co.uk/'
        const url = bullseyeCountrySportUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.prod-page-price span').each(function(i, element) {
                const unfiltered = $(this).text()
                const filtered = unfiltered.replace(/\s/g, "")

                itemDetails.push("£" + filtered, 0, 0)
            })
            $('#_EKM_PRODUCTSTOCK span').each(function(i, element) {
                const stock = $(this).text()

                if(stock == 'In Stock'){
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