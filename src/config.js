import path from 'path';
import devEnc from './largier-secret/development';
import prodEnc from './largier-secret/production';

const env = process.env.NODE_ENV || 'development';


const development = {
  UPLOAD_FOLDER: process.env.UPLOAD_FOLDER || path.join(process.env.HOME, '/www/uploads'),
  DB_PORT: '27017',
  DB_NAME: process.env.DB_NAME || 'largier_dev',
  DEBUG_LOG: true,
  DEBUG_WARN: true,
  DEBUG_ERROR: true,
  DEBUG_CLIENT: true,
};

const production = {
  UPLOAD_FOLDER: '/usr/local/share/uploads',
  DB_PORT: '27017',
  DB_NAME: process.env.DB_NAME || 'largier_app',
  DEBUG_LOG: false,
  DEBUG_WARN: false,
  DEBUG_ERROR: true,
  DEBUG_CLIENT: false,
};

const config = {
  ROOT: __dirname,
  DB_HOST: 'localhost',
};

switch (env) {
  case 'development': {
    Object.assign(config, development);
    if (devEnc) {
      Object.assign(config, devEnc);
    }
    break;
  }
  case 'production': {
    Object.assign(config, production);
    if (prodEnc) {
      Object.assign(config, prodEnc);
    }
    break;
  }
  default:
    console.error('Environment not found.');
}

const dbHost = config.DB_HOST || 'localhost';
const dbPort = (config.DB_PORT || '27017');
const dbName = config.DB_NAME;

const mongoUrl = `mongodb://${dbHost}:${dbPort}/${dbName}`;
config.mongoUrl = mongoUrl;

console.log(config);
export default config;
