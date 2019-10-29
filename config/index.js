const environmentConfig = require('./configurations');

const environment = process.env.NODE_ENV || 'development';
const appConfig = environmentConfig[environment];

global.gConfig = appConfig;

console.debug(`The app is using the ${environment} configuration...`);
