const router = require('express').Router()
const { models: { User } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const possibleAdmin = await User.findByToken(req.headers.authorization)
    // o: you want to make this into a middleware if you want to use this
    //  in multiple places
    if (possibleAdmin.isAdmin) {
      const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'isAdmin']
      })
      res.json(users)
    } else {
      throw 'Not an Admin'
    }
  } catch (err) {
    next(err)
  }
})
