const router = require('express').Router()
const InformationController = require('../controllers/informationController')
const authenticate = require('../middlewares/auth')
const user = require("./user")

router.use(user)

router.get("/informations/weather", authenticate, InformationController.fetchWeather)
router.get("/informations/air", authenticate, InformationController.fetchAir)
router.get("/informations/news", authenticate, InformationController.fetchNews)


module.exports = router