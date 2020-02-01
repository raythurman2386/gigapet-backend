require('dotenv').config()
const pg = require('pg')

const localPg = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

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
    connection: localPg || process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
}
