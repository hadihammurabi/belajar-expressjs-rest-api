const config = require('../../../config');
const jwt = require('jsonwebtoken');
const { user: UserService } = require('../../../service');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: 'Akses tidak diizinkan.' });

  const authHeaderSplitted = authHeader.trim().split(' ');

  const isAuthHeaderFineFormatted = authHeaderSplitted.length === 2;
  if (!isAuthHeaderFineFormatted) return res.status(403).json({ message: 'Format authentication salah.' });

  const isBearer = authHeaderSplitted[0].toLowerCase() === 'bearer';
  if (!isBearer) return res.status(403).json({ message: 'Jenis authentication tidak dikenali.' });

  try {
    const tokenData = jwt.verify(authHeaderSplitted[1], config.app.key);
    const user = (await UserService.getUserByID(tokenData.id)).toObject();
    delete user.password;
    req.user = user;
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: 'Token tidak valid.' });
  }

  next();
};
