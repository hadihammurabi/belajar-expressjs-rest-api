const { Router } = require('express');

const route = Router();

route.get('', async (req, res) => {
  res.json({
    message: 'Selamat datang di Belajar ExpressJS REST API',
  });
});

module.exports = route;
