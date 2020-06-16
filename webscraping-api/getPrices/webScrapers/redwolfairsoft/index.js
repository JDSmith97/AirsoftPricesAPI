const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const redwolfAirsoftUrl = 'http://uk.redwolfairsoft.com/'
        const url = redwolfAirsoftUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('div.main.clearFix div.content div.inner_content table table td font').each(function(i, element) {
                const unfiltered = $(this).text()
                const n = unfiltered.replace(/\s/g, "")

                itemDetails.push(n)
            })

            if(itemDetails.length == 15){
                const newPrice = itemDetails[12].replace(/GBP£/g, "")
                const newPriceFloat = parseFloat(newPrice)

                const oldPrice = itemDetails[11].replace(/GBP£/g, "")
                const oldPriceFloat = parseFloat(oldPrice)

                const difference = oldPriceFloat - newPriceFloat
                const discount = parseFloat(difference.toFixed(2))

                itemDetails.splice(0,12)
                itemDetails.splice(1,2)
                const price = itemDetails[0].replace(/GBP/g, "")
                
                itemDetails.push(price)
                itemDetails.splice(0,1)

                //Is a deal
                itemDetails.push(1, discount)
            } else {
                itemDetails.splice(0,10)
                itemDetails.splice(1,2)
                const newPrice = itemDetails[0].replace(/GBP/g, "")

                itemDetails.push(newPrice)
                itemDetails.splice(0, 1)

                //Not a deal
                itemDetails.push(0, 0)
            }
            $('div.main.clearFix div.content div.inner_content table table td div.white.available').each(function(i, element) {
                const stock = $(this).html()

                if(stock === 'Now'){
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