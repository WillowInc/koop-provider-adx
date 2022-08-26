const config = require('config')
const AdxQuery = require('./adx/adxQuery')

function Model (koop) {}

// Public function to return data
// Return: GeoJSON FeatureCollection
//
// Config parameters (config/default.json)
// req.
//
// URL path parameters:
// req.params.host (if index.js:hosts true)
// req.params.id  (if index.js:disableIdParam false)
// req.params.layer
// req.params.method
Model.prototype.getData = async function (req, callback) {
  const tableName = req.params.id
  const limit = req.query.resultRecordCount || config.resultRecordCount
  const offset = req.query.resultOffset || config.resultOffset
  const countOnly = req.query.returnCountOnly || false

  if (countOnly) {
    const count = await AdxQuery.getCount(tableName)
    callback(null, { count })
  }

  // query table
  const geoJson = await AdxQuery.GetDataWithOffset(tableName, offset, limit)
  callback(null, geoJson)
}

module.exports = Model
