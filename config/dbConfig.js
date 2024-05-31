let { Sequelize, Model, DataTypes, QueryTypes, Op } = require("sequelize");
require('dotenv').config();
const sequelizeCon = new Sequelize(process.env.DATABASE_NAME, 'root', '', {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
  });
  
// sequelizeCon.sync({ alter: true });
sequelizeCon
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully");
  })
  .catch(() => {
    console.log("Unable to connect DB");
  });
module.exports = {
  sequelizeCon,
  Model,
  DataTypes,
  QueryTypes,
  Op,
};