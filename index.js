require('dotenv').config();
const config = require('./config');
const { restAPI } = require('./delivery');

require('mongoose').connect(config.database.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  restAPI(config).run(async (port) => {
    console.log(`Application started at port ${port}`);
  });
}).catch(console.error);
