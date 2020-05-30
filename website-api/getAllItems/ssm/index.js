const AWS = require('aws-sdk')
const ssm = new AWS.SSM({region: 'eu-west-2'})

const ssmConfig = async () => {
  const data = await ssm.getParameters({ 
      Names: ['airsoft-prices-db-host', 'airsoft-prices-db-port', 'airsoft-prices-db-user', 'airsoft-prices-db-password', 'airsoft-prices-db-name'],
      WithDecryption: true 
  }).promise()

  const config = {}

  for (const i of data.Parameters) {
    if (i.Name === 'airsoft-prices-db-host') {
      config.db_host = i.Value
    }
    if (i.Name === 'airsoft-prices-db-port') {
      config.db_port = i.Value
    }
    if (i.Name === 'airsoft-prices-db-user') {
      config.db_user = i.Value
    }
    if (i.Name === 'airsoft-prices-db-password') {
      config.db_password = i.Value
    }
    if (i.Name === 'airsoft-prices-db-name') {
      config.db_name = i.Value
    }
  }
  return config
}

module.exports = {
  ssmConfig
}