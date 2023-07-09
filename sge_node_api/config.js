const dotenv = require('dotenv');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const envFilePath = path.resolve(__dirname, `.env.${env}`);

dotenv.config({ path: envFilePath });

module.exports = {
  database: {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase'
  },
  jwtSecret: process.env.JWT_SECRET || 'mysecretkey',
  port: process.env.PORT || 3000
};
