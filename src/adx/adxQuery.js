const config = require('config')
const KustoClient = require('azure-kusto-data').Client
const KustoConnectionStringBuilder = require('azure-kusto-data').KustoConnectionStringBuilder
const GeoJSON = require('geojson')

class AdxQuery {
  constructor () {
    this.adxConnection = {
      clusterUrl: process.env.ADX_CLUSTERURL || config.adx.clusterUrl,
      database: process.env.ADX_DATABASE || config.adx.database,
      userId: process.env.ADX_USERID || config.adx.userId,
      password: process.env.ADX_PASSWORD || config.adx.password
    }

    this.kcsb = KustoConnectionStringBuilder.withAzLoginIdentity(this.adxConnection.clusterUrl)
    this.kustoClient = new KustoClient(this.kcsb)
  }

  async getCount (tableName) {
    const results = await this.kustoClient.execute(this.adxConnection.database, `${tableName} | count`)
    return results && results.primaryResults && results.primaryResults[0].toJSON().data[0].Count
  }

  async GetDataWithOffset (tableName, offset, limit) {
    const results = await this.kustoClient.execute(
      this.adxConnection.database,
    `${tableName} | order by ${config.idField} asc | extend Num=row_number() | where Num > ${offset} | take ${limit}`)

    const pointResults = results.primaryResults[0].toJSON().data

    const geoJson = GeoJSON.parse(pointResults, { Point: [config.LatitudeColumn, config.LongitudeColumn] })

    geoJson.metadata = {
      idField: config.idField,
      maxRecordCount: config.maxRecordCount
    }

    geoJson.filtersApplied = { offset: true, limit: true }

    return geoJson
  }
}

module.exports = new AdxQuery()
