const config = require('../config/config');

let host;
let webHost;
let uploaderHost;
let uploaderStaticPath;

switch (config.env) {
  case 'development_local':
    host = 'http://localhost:5000';
    webHost = 'http://localhost:3000';
    uploaderHost = 'http://localhost:7000';
    uploaderStaticPath = 'http://localhost:7000/download';
    break;
  case 'development_server':
    host = 'https://api.dev.---.com';
    webHost = 'https://dev.---.com';
    uploaderHost = 'http://dev-upload.web.1:3000';
    uploaderStaticPath = 'https://static.dev.---.com';
    break;
  case 'production':
    host = 'https://api.---.com';
    webHost = 'https://---.com';
    uploaderHost = 'http://upload.web.1:3000';
    uploaderStaticPath = 'https://static.---.com';

    break;
  default:
    host = 'https://api.---.com';
    webHost = 'https://---.com';
    uploaderHost = 'http://localhost:7000';
    uploaderStaticPath = 'https://static.---.com';
    break;
}

module.exports = { host, webHost, uploaderHost, uploaderStaticPath };
