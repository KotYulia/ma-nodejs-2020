const Knex = require('knex');
const dbOptions = require('./config/config').DB;

const knex = new Knex(dbOptions);

const createUsersTable = async () => {
  if (!knex.schema.hasTable('users')) {
    await knex.schema
      .createTable('users', (table) => {
        table.increments('id');
        table.string('login');
        table.string('password');
        table.string('token');
      })
      .then(() => console.log(knex.schema.hasTable('users')))
      .catch((error) => {
        console.log(error);
        throw error;
      })
      .finally(() => {
        knex.destroy();
      });
  } else console.log('Users table exists');
};

// eslint-disable-next-line no-unused-vars
const createUser = async (login, password, token) => {
  await knex('users')
    .insert({ login, password, token })
    .then(() => console.log(`User ${login} created`))
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .finally(() => {
      knex.destroy();
    });
};

const findUser = async (login) => {
  await knex('users')
    .where({ login })
    .then((res) => console.log(`User ${res[0].login} found`))
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const updateUser = async (login, params) => {
  await knex('users')
    .where({ login })
    .update(params)
    .then((res) => console.log(`User is updated with result ${res}`))
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

const deleteUser = async (login) => {
  await knex('users')
    .where({ login })
    .del()
    .then(() => console.log(`User ${login} deleted`))
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .finally(() => {
      knex.destroy();
    });
};

createUsersTable();
createUser('login1', 'password1', 'token1');
createUser('login2', 'password2', 'token2');
createUser('login3', 'password3', 'token3');
findUser('login2');
updateUser('login1', { login: 'login', token: 'token' });
deleteUser('login3');
