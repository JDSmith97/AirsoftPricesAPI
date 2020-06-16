const axios = require('axios')
const cheerio = require('cheerio')

const getItemPrice = async (productUrl) => {
    return new Promise(function(resolve, reject) {
        const zeroOneAirsoftUrl = 'https://www.zerooneairsoft.com/'
        const url = zeroOneAirsoftUrl + productUrl

        axios.get(url)
        .then(async response => {
            const $ = cheerio.load(response.data)
            const itemDetails = [];
            $('td.ProductInfoMainPrice').each(function(i, element) {
                const price = $(this).text()
                const filteredPrice = price.replace(/\s/g, "")
                itemDetails.push(filteredPrice)
            })
            if(itemDetails[0].includes('OriginalPrice:')) {
                const oldPrice = itemDetails[0].split("Price")
                const oldPriceFormatted = oldPrice[1].replace(":", "")

                const currentPrice = itemDetails[0].split("CurrentPrice:");
                const currentPriceNumber = currentPrice[1].split("▲")
                const currentPriceFormatted = "£" + currentPriceNumber[0]

                const oldPriceFloat = parseFloat(oldPriceFormatted)
                const currentPriceFloat = parseFloat(currentPriceNumber[0])

                const difference = oldPriceFloat - currentPriceFloat
                const discount = parseFloat(difference.toFixed(2))

                itemDetails.splice(0,1)
                itemDetails.push(currentPriceFormatted, 1, discount)
            }
            else if(itemDetails[0].includes('Was:')) {
                itemDetails.splice(0,1)
                $('td.ProductInfoMainPrice font').each(function(i, element) {
                    const oldPrice = $(this).text()
                    const filteredOldPrice = oldPrice.replace(/\s/g, "")
                    const removedText = filteredOldPrice.replace(/Was:/g, "")
                    itemDetails.push(removedText)
                })
                $('td.ProductInfoMainPrice span').each(function(i, element) {
                    const oldPrice = $(this).text()
                    const theOldprice = oldPrice.replace(/\s/g, "")
                    itemDetails.push(theOldprice)
                })
                itemDetails.splice(1,1)
                itemDetails.splice(2,1)

                const oldPrice = itemDetails[0].replace("£", "")
                const oldPriceFloat = parseFloat(oldPrice)

                const newPrice = itemDetails[1].replace("£", "")
                const newPriceFloat = parseFloat(newPrice)

                const difference = oldPriceFloat - newPriceFloat
                const discount = parseFloat(difference.toFixed(2))

                itemDetails.splice(0,1)
                itemDetails.push(1, discount)
            } else {
                itemDetails.push(0, 0)
            }
            $('td.ProductInfoMainStock').each(function(i, element) {
                const stock = $(this).text()
                const filteredStock = stock.replace(/\n/g, "")
                itemDetails.push(filteredStock)
            })
            if(itemDetails[3].includes('12 Months 0% Finance')){
                itemDetails.splice(3,6)
            }
            if(itemDetails[4] === 'In stock for next day delivery' || itemDetails[4] === 'In stock for next day deliveryAlso on display in our showroom'){
                itemDetails.splice(3,1)
                itemDetails.splice(3,4)
                itemDetails.push('In Stock')
            } else {
                itemDetails.splice(3,6)
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