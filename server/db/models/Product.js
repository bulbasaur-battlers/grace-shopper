const { set } = require('express/lib/application');
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

  pennies: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.VIRTUAL,
    get() {
      if (Math.floor(this.pennies / 100) === 0) {
        return this.pennies % 100 < 10
          ? `00.0${this.pennies % 100}`
          : `00.${this.pennies % 100}`;
      } else {
        if (this.pennies % 100 === 0) {
          return `${Math.floor(this.pennies / 100)}.00`;
        } else if (this.pennies % 100 < 10) {
          return `${Math.floor(this.pennies / 100)}.0${this.pennies % 100}`;
        } else {
          return `${Math.floor(this.pennies / 100)}.${this.pennies % 100}`;
        }
      }
    },
    set(value) {
      throw new Error('Price is determined by pennies!');
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
