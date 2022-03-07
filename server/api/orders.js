const router = require('express').Router();
const {
  models: { Product, Order, User, OrderProduct },
} = require('../db');

// ADD TO CART
router.post('/current', async (req, res, next) => {
  try {
    const currUser = await User.findByToken(req.headers.authorization);
    const { product, quantity } = req.body;
    if (currUser) {
      //FIND CURRENTLY PENDING ORDER
      const currOrder = await Order.findOne({
        where: {
          userId: currUser.id,
          confirmed: false,
        },
      });
      //CHECK IF CART EXISTS-> IF NOT, CREATE ONE, ADD PRODUCT TO CART
      if (!currOrder) {
        const newOrder = await currUser.createOrder();
        const addedProd = await newOrder.addProduct(product.id, {
          through: { quantity: quantity },
        });
        res.json(addedProd);
      } else {
        if (await currOrder.hasProduct(product.id)) {
          const orderQuant = await OrderProduct.findOne({
            where: {
              orderId: currOrder.id,
              productId: product.id,
            },
          });
          await orderQuant.update({ quantity: orderQuant.quantity + quantity });
        } else {
          const addedProd = await currOrder.addProduct(product.id, {
            through: { quantity: quantity },
          });

          res.json(addedProd);
        }
      }
    }
  } catch (err) {
    console.error(err);
    next();
  }
});
//TO SEE CURRENT CART
router.get('/current', async (req, res, next) => {
  try {
    const currUser = await User.findByToken(req.headers.authorization);
    if (currUser) {
      const currOrder = await Order.findPendingByUserId(currUser.id);
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
router.put('/current', async (req, res, next) => {
  try {
    const currUser = await User.findByToken(req.headers.authorization);
    // IF CURRENT USER EXISTS
    if (currUser) {
      //CHECKING IF PURCHASE BUTTON WAS CLICKED
      if (req.query.confirmed) {
        const { orderId } = req.body;
        const currOrder = await Order.findByPk(orderId, {
          where: {
            userId: currUser.id,
            confirmed: false,
          },
        });
        //UPDATE CART TO CONFIRMED
        await currOrder.update({ confirmed: true });
        const newOrder = currUser.createOrder();
        res.json(newOrder);
      } else {
        // IF PURCHASE BUTTON WASNT CLICKED -> UPDATE CART WAS CLICKED
        //(SEND updated: {{productId, quantity}, ...}, orderId, FROM FRONT END)
        // GRABBING UPDATED ITEMS FROM CART
        const { updated, orderId } = req.body;
        // GRABBING CURRENT UNCONFIRMED CART
        const currOrder = await Order.findByPk(orderId, {
          where: {
            confirmed: false,
          },
        });
        // CHECKING IF USER OWNS THIS CART
        if (currUser.hasOrder(currOrder)) {
          // IF THEY DO, LOOP THROUGH UPDATED ITEMS({productId, quantity}) AND UPDATE CART CONTENTS
          for (const key in updated) {
            const currOrderItem = await OrderProduct.findOne({
              where: {
                orderId: orderId,
                productId: key,
              },
            });
            await currOrderItem.update({ quantity: updated[key] });
          }
          res.sendStatus(200);
        }
      }
    }
  } catch (err) {
    console.error(err);
    next();
  }
});
router.delete('/current', async (req, res, next) => {
  try {
    const { orderId, productId } = req.body;
    const currUser = await User.findByToken(req.headers.authorization);
    const currOrder = await Order.findByPk(orderId, {
      where: {
        confirmed: false,
      },
    });
    if (currUser.hasOrder(currOrder)) {
      currOrder.removeProduct(productId);
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/past', async (req, res, next) => {
  try {
    const currUser = await User.findByToken(req.headers.authorization);
    if (currUser) {
      // const pastOrders = await Order.findAll({
      //   where: {
      //     userId: currUser.id,
      //     confirmed: true,
      //   },
      //   include: [
      //     {
      //       model: Product,
      //       through: {
      //         attributes: ['quantity'],
      //       },
      //     },
      //   ],
      // });
      const pastOrders = Order.findPastByUserId(currUser.id);
      res.json(pastOrders);
    }
  } catch (error) {
    console.error(error);
    next();
  }
});

router.get('/past/:id', async (req, res, next) => {
  try {
    const currUser = await User.findByToken(req.headers.authorization);
    if (currUser) {
      const orderId = req.params.id;
      const pastOrder = await Order.findByPk(orderId, {
        where: {
          userId: currUser.id,
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
      res.json(pastOrder);
    }
  } catch (err) {
    console.error(err);
    next();
  }
});
module.exports = router;
