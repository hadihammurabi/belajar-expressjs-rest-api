const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const UserService = require('./user');

const loginBearer = async (cred) => {
  const userByEmail = await UserService.getUserByEmail(cred.email);
  if (!userByEmail) throw ({ errors: { credential: { name: 'AuthError', message: 'Invalid email or password.' } } });
  
  const user = userByEmail.toObject();
  const isPasswordValid = bcrypt.compareSync(cred.password, user.password);
  if (!isPasswordValid) throw ({ errors: { credential: { name: 'AuthError', message: 'Invalid email or password.' } } });

  delete user.password;
  const token = jwt.sign({id: user._id}, config.app.key);
  return token;
};

module.exports = {
  loginBearer,
};
