// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port:'5432',
      database: 'Api Tinder SQL',
      user:     'postgres',
      password: 'Lina2409*'
    },
    useNullAsDefault: true,
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port:'5432',
      database: 'Api Tinder SQL',
      user:     'postgres',
      password: 'Lina2409*'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      port:'5432',
      database: 'Api Tinder SQL',
      user:     'postgres',
      password: 'Lina2409*'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
