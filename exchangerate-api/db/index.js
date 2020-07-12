var AWS = require('aws-sdk')
AWS.config.update({region: 'eu-west-2'})

var ddb = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'})

const insertGBPtoEUR = (EUR) => {
  var params = {
    TableName: 'airsoftPrices-exchangeRates',
    Key: {
      'currency':'GBPtoEUR'
    },
    UpdateExpression: "set rate = :rate",
    ExpressionAttributeValues: {
      ':rate': EUR
    },
    ReturnValues: "UPDATED_NEW"
  }
  
  ddb.update(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  })
}

const insertEURtoGBP = (GBP) => {
  var params = {
    TableName: 'airsoftPrices-exchangeRates',
    Key: {
      'currency': 'EURtoGBP'
    },
    UpdateExpression: "set rate = :rate",
    ExpressionAttributeValues: {
      ':rate': GBP
    },
    ReturnValues: "UPDATED_NEW"
  }
  
  ddb.update(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  })
}

const insertRates = async (EUR, GBP) => {
  await insertGBPtoEUR(EUR)
  await insertEURtoGBP(GBP)
}

module.exports = {
  insertRates
}