const bcrypt = require('bcrypt');
const User = require('../entity/User');

const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const getUserByID = async (_id) => {
  const user = await User.findOne({ _id });
  return user;
};

const createUser = async (user) => {
  const isEmailUsed = await getUserByEmail(user.email);
  if (!!isEmailUsed) throw ({ errors: { email: { name: 'ValidationError', message: 'Path `email` already used.' } } });

  if (user.password) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
  const userCreated = (await User.create(user)).toObject();
  delete userCreated.password;
  return userCreated;
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserByID,
};
