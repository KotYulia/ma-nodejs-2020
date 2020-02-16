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
      .then(() => console.log('Users table created'))
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

const findUser = async (id) => {
  await knex('users')
    .where({ id })
    .then((res) => console.log(`User with id = ${id} is ${res[0].login}`))
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .finally(() => {
      knex.destroy();
    });
};

const updateUser = async (id, params) => {
  await knex('users')
    .where({ id })
    .update(params)
    .then((res) => console.log(`User is updated with result ${res}`))
    .catch((error) => {
      console.log(error);
      throw error;
    })
    .finally(() => {
      knex.destroy();
    });
};

const deleteUser = async (id) => {
  await knex('users')
    .where({ id })
    .del()
    .then(() => console.log(`User with ${id} is deleted`))
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
findUser(2);
updateUser(1, { login: 'login', token: 'token' });
deleteUser(3);
