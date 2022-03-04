const router = require('express').Router();
const {
  models: { Product, User },
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

//adminOnly
router.post('/', async (req, res, next) => {
  try {
    const possibleAdmin = await User.findByToken(req.headers.authorization)
    if (possibleAdmin.isAdmin) {
      res.send(await Product.create(req.body))
    } else {
      throw 'Not an Admin'
    }
  } catch (err) {
    console.error(err);
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const possibleAdmin = await User.findByToken(req.headers.authorization)
    if (possibleAdmin.isAdmin) {
      const product = await Product.findByPk(req.params.id)
      res.send(await product.update(req.body))
    } else {
      throw 'Not an Admin'
    }
  } catch (err) {
    console.error(err);
    next(err)
  }
})

router.delete('/id', async (req, res, next) => {
  try {
    const possibleAdmin = await User.findByToken(req.headers.authorization)
    if (possibleAdmin.isAdmin) {
      const product = await Product.findByPk(req.params.id)
      await product.destory()
      res.send(product)
    } else {
      throw 'Not an Admin'
    }
  } catch (err) {
    console.error(err);
    next(err)
  }
})

module.exports = router;
