const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  confirmed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
    },
  },
});
