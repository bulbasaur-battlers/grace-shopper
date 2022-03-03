const router = require('express').Router()
const { models: { User } } = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const possibleAdmin = await User.findByToken(req.headers.authorization)
    if (possibleAdmin.isAdmin) {
      const users = await User.findAll({
        attributes: ['id', 'username', 'email', 'userType']
      })
      res.json(users)
    } else {
      throw 'Not an Admin'
    }
  } catch (err) {
    next(err)
  }
})
