const Knex = require('knex');
const dbOptions = require('./config/config').DB;

const knex = new Knex(dbOptions);

const createUsersTable = async () => {
  if (await knex.schema.hasTable('users')) {
    console.log('Users table exists');
  } else {
    await knex.schema
      .createTable('users', (table) => {
        table.increments('id');
        table.string('login');
        table.string('password');
        table.string('token');
      })
      .then(() => console.log('Table created!'))
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }
};

const createUser = async (login, password, token) => {
  await knex('users')
    .insert({ login, password, token })
    .then(() => console.log(`User ${login} created`))
    .catch((error) => {
      console.log(error);
      throw error;
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

(async () => {
  try {
    await createUsersTable();
    await createUser('login1', 'password1', 'token1');
    await createUser('login2', 'password2', 'token2');
    await createUser('login3', 'password3', 'token3');
    await findUser('login2');
    await updateUser('login1', { login: 'login', token: 'token' });
    await deleteUser('login3');
  } catch (error) {
    console.log(error);
    throw error;
  }
})();
