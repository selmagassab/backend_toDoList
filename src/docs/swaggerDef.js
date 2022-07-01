const { version } = require('../../package.json');
// const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'Inaya APP API documentation',
    version,
    license: {
      name: 'inaya',
      url: '',
    },
  },
  servers: [
    {
      url: `/v1`,
    },
  ],
};

module.exports = swaggerDef;
