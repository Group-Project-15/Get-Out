const { User } = require('../models')
const {comparePass} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")

class UserController {

  //-----------register create new user------------
  static register(req, res, next){
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      location: req.body.location
    }

    User.create(newUser)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
  }

  //-----------Login User------------
  static login(req, res, next){
    let email = req.body.email

    User.findOne({
      where: {email}
    })
    .then(data => {
      if(!data) throw ({name: "custom", msg: "Email not Found", status: 404})

      let password = comparePass(req.body.password, data.password)
      if(!password) throw({name: "custom", msg: "Wrong Email or Password", status: 400})

      let token = generateToken({
        id: data.id,
        email: data.email
      })

      res.status(200).json({token})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController