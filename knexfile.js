require('dotenv').config()
const pg = require('pg')

pg.defaults.ssl = true

const sqlite = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations'
  },
  seeds: {
    directory: './data/seeds'
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys=ON', done)
    }
  }
}

module.exports = {
  development: {
    ...sqlite,
    connection: {
      filename: './data/gigapet.db3'
    }
  },

  test: {
    ...sqlite,
    connection: {
      filename: './data/test.db3'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
}
