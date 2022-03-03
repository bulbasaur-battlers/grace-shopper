const router = require('express').Router();
const {
  models: { Product, Order, User, OrderProduct },
} = require('../db');

router.get('/current', async (req, res, next) => {
  try {
    const currUser = await User.findByToken(req.headers.authorization);
    console.log(currUser.id);
    if (currUser) {
      const currOrder = await Order.findOne({
        where: {
          userId: currUser.id,
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
      console.log(currOrder.products[0].orderproduct.quantity);
      res.json(currOrder);
    } else {
      //REPLACE WITH GUEST CART
      next();
    }
  } catch (error) {
    console.error(error);
    next();
  }
});

module.exports = router;
