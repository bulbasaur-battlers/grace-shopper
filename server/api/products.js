const router = require('express').Router();
const {
  models: { Product },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({});
    res.json(products);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);
    if (!product) {
      next();
    } else {
      res.json(product);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
