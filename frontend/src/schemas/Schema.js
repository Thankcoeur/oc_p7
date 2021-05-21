const Joi  = require("joi")



 const LoginSchema = Joi.object({

    username: Joi.string().min(3).max(30).required(),
password : Joi.string().pattern(new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)).required()





})




export  default LoginSchema
