const Joi  = require("joi")



 module.exports = Joi.object({

    content: Joi.string().min(5),
    inputFile : Joi.string()
   





})



