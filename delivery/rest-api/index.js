const express = require('express');
const bodyParser = require('body-parser');
const root = require('./root');
const auth = require('./auth');

const delivery = (config) => ({
  config,
  app: express(),
  createRoute: function() {
    this.app.use('/', root);
    this.app.use('/auth', auth);
    return this;
  },
  configure: function() {
    this.app.use(bodyParser.json());
    return this;
  },
  run: function(cb) {
    this.app.listen(this.config.app.port, () => cb(this.config.app.port));
  },
});

module.exports = (config) => {
  return delivery(config).configure().createRoute();
};
