const { DataSource } = require('typeorm');

const ISDEVELOPMENT = process.env.NODE_ENV === 'development';

const entities = ISDEVELOPMENT
  ? [__dirname + '/src/models/**/*.entity.ts']
  : undefined;
const migrations = ISDEVELOPMENT
  ? [__dirname + '/migrations/**/*.ts']
  : [__dirname + '/migrations/**/*.js'];
const dataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT),
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  entities,
  migrations,
};

const dataSource = new DataSource(dataSourceOptions);

module.exports = dataSource;
