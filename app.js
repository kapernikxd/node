const express = require('express')
const app = express()
const server = require("http").createServer(app);

const bodyParser = require('body-parser')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')

const authRoutes = require('./routes/auth.routes')




app.use(express.json())
app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');

  next();
});


app.use(passport.initialize())
passport.use(passportStrategy)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api', authRoutes)



module.exports = {
  app,
  server,
};