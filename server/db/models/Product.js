const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  imageUrl: {
    type: Sequelize.TEXT,
    validate: {
      isUrl: true,
    },
    defaultValue:
      'https://skotfashion.com/wp-content/uploads/2018/02/placeholder.jpg',
  },

  description: {
    type: Sequelize.TEXT,
  },
});

module.exports = Product;
