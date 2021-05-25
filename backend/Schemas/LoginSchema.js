const Joi = require('joi')

module.exports = Joi.object({
    username: Joi.string().min(3).max(30).required(),

    password: Joi.string()
        .pattern(
            new RegExp(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
            )
        )
        .required(),
})
