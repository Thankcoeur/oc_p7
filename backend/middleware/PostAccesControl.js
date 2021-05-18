let models = require('../models');



module.exports =  async  (req, res, next) => {
   try {
      if ( req.user.isAdmin ) {
         next()

      }
      console.log(req.body)
       const post = await  models.Post.findByPk(req.body.id)
       if(!post) throw new Error("post non trouvé")
       
       if (!(post.userId == req.user.userId)) throw new Error("user id user ne correspond pas avec user id du post")


         next()

         

      }
    
    
 catch (e) {

   console.log(e)





   }
   

  
 
};