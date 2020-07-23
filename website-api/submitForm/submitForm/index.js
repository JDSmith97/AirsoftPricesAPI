var aws = require("aws-sdk")
var ses = new aws.SES({ region: "eu-west-1" })

const submit = (name, email, product) => {
  return new Promise(async function(resolve, reject) {
    var params = {
      Destination: {
        ToAddresses: ["contact@airsoft-prices.com"],
      },
      Message: {
        Body: {
          Text: { Data: `Name: ${name}, \r\nEmail: ${email}, \r\nProduct: ${product}`},
        },

        Subject: { Data: "Add a product" },
      },
      Source: "contact@airsoft-prices.com",
    }

    ses.sendEmail(params, function (err, data) {
      if (err) {
        console.log(err)
      } else {
        console.log(data)

        resolve("Email sent")
      }
    })
  })
}

module.exports = {
  submit
}
