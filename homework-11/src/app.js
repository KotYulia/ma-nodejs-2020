const {sequelize, User} = require('./models');

const createUser = async(login, password, token) => {
  try {
    await User.create({login, password, token});
    console.log(`User ${login} created`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const findUser = async(login) => {
  try {
    const user = await User.findOne({where: {login}});
    console.log(`User ${user.login} found`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateUser = async(login, params) => {
  try {
    await User.update(params, {where: {login}});
    console.log('Users updated');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const deleteUser = async(login) => {
  try {
    await User.destroy({where: {login}});
    console.log(`Users with ${login} deleted`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

(async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  try {
    await createUser('login1', 'password1', 'token1');
    await createUser('login2', 'password2', 'token2');
    await createUser('login3', 'password3', 'token3');
    await findUser('login2');
    await updateUser('login1', {login: 'login', token: 'token'});
    await deleteUser('login3');
  } catch (error) {
    console.log(error);
    throw error;
  }

  try {
    await sequelize.close();
    console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error('Unable to close the database connection:', error);
  }
})();
