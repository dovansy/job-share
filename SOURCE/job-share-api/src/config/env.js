const Sequelize = require("sequelize");
const { debug } = require("@utils/constant");

const env = {
  // host: process.env.DB_HOST || '127.0.0.1',
  // user: process.env.DB_USER || 'root',
  // password: process.env.DB_PASSWORD || 'chien1003',

  host: process.env.DB_HOST || "13.251.27.111",
  user: process.env.DB_USER || "sydv",
  password: process.env.DB_PASSWORD || "123456a@",
  database: process.env.DB_NAME || "jobshare_test",
};

const sequelize = new Sequelize(env.database, env.user, env.password, {
  host: env.host,
  dialect: "mysql",
  // logging: debug.db,
  logging: false,
  query: { raw: false },
  timezone: "+07:00",
  dialectOptions: {
    multipleStatements: true,
  },
  pool: {
    max: 30,
    min: 0,
    acquire: 60000,
    idle: 5000,
  },
  define: {
    hooks: true,
  },
});

module.exports = sequelize;
