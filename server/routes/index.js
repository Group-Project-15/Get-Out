const router = require('express').Router()
const Controller = require('../controllers/controller')
const user = require("./user")


router.use(user)

module.exports = router