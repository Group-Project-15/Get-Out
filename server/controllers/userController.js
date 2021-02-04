const { User } = require('../models')
const {comparePass} = require("../helpers/bcrypt")
const {generateToken} = require("../helpers/jwt")
const {OAuth2Client} = require('google-auth-library');

class UserController {

  //-----------register create new user------------
  static register(req, res, next){
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      location: req.body.location
    }

    if(newUser.location === ''){
      newUser.location = "Jakarta"
    }

    User.create(newUser)
    .then(data => {
      let output = {
        id: data.id,
        email: data.email,
        location: data.location
      }
      res.status(201).json(output)
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

      let access_token = generateToken({
        id: data.id,
        email: data.email,
        location: data.location
      })

      res.status(200).json({token: access_token})
    })
    .catch(err => {
      next(err)
    })
  }

  //-----------Google Login User------------
  static googleLogin(req, res, next){
    console.log("masuk google login");
    const client = new OAuth2Client(process.env.USER_ID);
    let email = ""

    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.USER_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload()
      email = payload.email

      return User.findOne({
        where: {
          email: email
        }
      })
    })
    .then(data=> {
      if(data){
        let access_token = generateToken({
          id: data.id,
          email: data.email,
          location: data.location
        })
        res.status(200).json({token: access_token})
      }
      else{
        return User.create({
          email: email, 
          password: "googlePass",
          location: "Jakarta"
        })
      }
    })
    .then(data => {
      let access_token = generateToken({
        id: data.id,
        email: data.email,
        location: data.location
      })
      res.status(201).json({access_token})
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController