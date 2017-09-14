module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/garagebin',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  }

};
