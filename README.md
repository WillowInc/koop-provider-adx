# Koop ADX Provider

Configurable [pass-through](https://koopjs.github.io/docs/basics/provider-types#pass-through) Koop provider for [Azure Data Explorer (ADX)](https://docs.microsoft.com/en-us/azure/data-explorer/data-explorer-overview). As such, it's meant to be used with a [Koop server](https://koopjs.github.io/) instance. For more information on Koop, check out the related [documentation](https://koopjs.github.io/docs/basics/what-is-koop).

Enables exposing geospatial data stored in ADX as a [GeoServices API](http://geoservices.github.io/).

## Configuration

Set your database connection parameters in `config/default.json`.

## Example API Queries

Replace `${tableName}` with the name of the ADX table that you wish to query:

```shell
curl localhost:8080/adx/rest/services/${tableName}/FeatureServer/0/query?f=json
```

## Limitations

- only point geometry is supported at the moment

## Development

You can run the provider locally by running `npm start` or `koop serve`. This will start a server at `localhost:8080`.

## Planned features

- support for line and polygon geometry
- in-query geometry filtering
- multiple ADX authentication methods
- improved test coverage
