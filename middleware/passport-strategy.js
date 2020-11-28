const {Strategy, ExtractJwt} = require('passport-jwt')
const keys = require('../keys')
const User = require('../models/logins_model')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.JWT
}

module.exports = new Strategy(options, async (payload, done) => {
  try {
    const candidate = await User.confirmUser(payload.login)
    //console.log("candidate",candidate[0].login)
    if (candidate) {
      done(null, candidate[0].login)
    } else {
      done(null, false)
    }
  } catch (e) {
    console.error(e)
  }
})
