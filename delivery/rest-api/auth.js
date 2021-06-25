const { Router } = require('express');
const { user: UserService, auth: AuthService } = require('../../service');
const { auth: AuthMiddleware } = require('./middleware');

const route = Router();

route.post('/register', async (req, res) => {
  try {
    const user = await UserService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({
      error: error.errors,
    });
  }
});

route.post('/login', async (req, res) => {
  try {
    const token = await AuthService.loginBearer(req.body);
    res.json({token, type: 'Bearer'});
  } catch (error) {
    res.status(400).json({ error: error.errors});
  }
});

route.get('/profile', AuthMiddleware, async (req, res) => {
  res.json({ data: req.user });
});

module.exports = route;
