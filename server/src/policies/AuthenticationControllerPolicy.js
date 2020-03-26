const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(),
      username: Joi.string(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'חובה לציין אימייל תקני'
          })
          break
        case 'password':
          res.status(400).send({
            error: `על הססמה לעמוד בדרישות הבאות:
              <br>
              1. חייבת לכלול אותיות גדולות וקטנות ומספרים, בלבד.
              <br>
              2. חייבת להיות באורך בין 8 ל 32 תווים.
            `
          })
          break
        case 'username':
          res.status(400).send({
            error: 'חובה לציין שם משתמש'
          })
          break
        default:
          res.status(400).send({
            error: 'שגיאת רישום משתמש'
          })
      }
    } else {
      next()
    }
  }
}
