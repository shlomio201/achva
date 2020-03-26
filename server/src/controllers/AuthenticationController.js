const {User} = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: 60 * 60
  })
}

module.exports = {
  async register (req, res) {
    try {
      const {username, email} = req.body
      let searchuser = await User.findOne({
        where: {
          username: username
        }
      })
      if (searchuser) {
        return res.status(400).send({
          error: 'שם משתמש כבר בשימוש'
        })
      }
      searchuser = await User.findOne({
        where: {
          email: email
        }
      })
      if (searchuser) {
        return res.status(400).send({
          error: 'כתובת המייל כבר בשימוש'
        })
      }

      const user = await User.create(req.body)
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: 'שגיאה ביצירת משתמש חדש'
      })
    }
  },
  async login (req, res) {
    try {
      const {username, password} = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'לא נמצא מתמש בשם זה במערכת'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'ססמה לא נכונה'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'שגיאה בניסיון להתחבר למערכת'
      })
    }
  }
}
