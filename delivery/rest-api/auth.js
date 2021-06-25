const { Router } = require('express');
const bcrypt = require('bcrypt');
const { user: UserService, auth: AuthService } = require('../../service');

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
    console.log({error});
    res.status(400).json({ error: error.errors});
  }
});

module.exports = route;
