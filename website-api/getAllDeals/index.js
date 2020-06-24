const getAllDeals = require('./getAllDeals')

const test = async function (event, context, callback) {
  try {
    const items = await getAllDeals.getDeals()

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Credentials" : true
      },
      body: items
    };

    callback(null, response);
  }
  catch(err) {
    console.log(err)
  }
}

test()