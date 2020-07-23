const submitForm = require('./submitForm')

module.exports.handler = async function (event, context, callback) {
  try {
    let name = event.queryStringParameters.name
    let email = event.queryStringParameters.email
    let product = event.queryStringParameters.product

    const submit = await submitForm.submit(name, email, product)

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: JSON.stringify(submit)
    };

    callback(null, response);
  }
  catch(err) {
    console.log(err)
  }
}
