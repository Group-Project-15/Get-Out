const router = require('express').Router()
const Controller = require('../controllers/controller')
const authenticate = require('../middlewares/auth')
const user = require("./user")


router.get("/informations/weather", authenticate, Controller.weather)
router.get("/informations/air", authenticate, Controller.air)
router.get("/informations/news", authenticate, Controller.news)

router.use(user)

module.exports = router