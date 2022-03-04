const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('./Product');

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

Order.findPendingByUserId = async function (userId) {
  const currOrder = await Order.findOne({
    where: {
      userId: userId,
      confirmed: false,
    },
    include: [
      {
        model: Product,
        through: {
          attributes: ['quantity'],
        },
      },
    ],
  });
  return currOrder;
};

Order.findPastByUserId = async function (userId) {
  const pastOrders = await Order.findAll({
    where: {
      userId: userId,
      confirmed: true,
    },
    include: [
      {
        model: Product,
        through: {
          attributes: ['quantity'],
        },
      },
    ],
  });
};

module.exports = Order;
