const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://www.patrolbase.co.uk/tokyo-marui-desert-eagle-50ae-hard-kick-gbb-pistol?pv=816';

axios.get(url)
    .then(response => {
        // console.log(response.data);
        const $ = cheerio.load(response.data);
        $('div.content-block.detail-price span.price-formatted').each(function(i, element) {
            const price = $(this).text();
            console.log(price);
        });
        $('div.content-block.detail-stock-message div.stock-message script').each(function(i, element) {
            const stock = $(this).html();
            const stockMessage = JSON.parse(stock)
            console.log(stockMessage.stockMessage.displayName)
        });
    })
    .catch(error => {
        console.log(error);
    })