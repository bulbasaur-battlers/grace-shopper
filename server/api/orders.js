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

// o: you can write this in its own module and import as needed
// function loadUser(req, res, next) {
//   req.user = await User.findByToken(req.headers.authorization);
// }

router.put('/current', async (req, res, next) => {
  try {
    // o: I am seeing this logic duplicated in several places, this
    //  can be made into a middleware, where you can store currUser within
    //  req.body and retrieve it from there in other routes
    const currUser = await User.findByToken(req.headers.authorization);
    // IF CURRENT USER EXISTS
    if (currUser) {
      //CHECKING IF PURCHASE BUTTON WAS CLICKED
      // o: can you explain the purpose of this conditional
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
    // o: see my explanation above regarding req.user
    const currUser = await User.findByToken(req.headers.authorization);
    const currOrder = await Order.findByPk(orderId, {
      where: {
        confirmed: false,
      },
    });
    if (currUser.hasOrder(currOrder)) {
      currOrder.removeProduct(productId);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/past', async (req, res, next) => {
  try {
    // o: see my explanation above regarding req.user
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
    // o: see my explanation above regarding req.user
    const currUser = await User.findByToken(req.headers.authorization);
    if (currUser) {
      const orderId = req.params.id;

      // o: also make sure you check for when order is NOT found
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
