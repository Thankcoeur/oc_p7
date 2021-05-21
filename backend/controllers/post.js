let models = require('../models');
const fs = require('fs');



exports.add =  async (req, res) => {

    


    try {
        const content = req.body.content
        const id  =   1
        var attachement = null
        

        if (content == null) {
            throw new Error("rien a publier")
        }

       const user =  models.User.findOne({
            attributes: ['id', 'email', 'username'],
            where: { id: id }
        })

        if (user == null) throw new Error("utilisateur  n'existe pas")

        if(req.file) attachement = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        else attachement =null

        const post = await  models.Post.create({
            content: content,
            attachement:   attachement,
            UserId: id
        })

        res.status(200).json(post)






    }catch (e) {
        console.log(e)
        res.status(500).json({message :"post non ajouté"})
        



    }
    
    
    

}


exports.listMsg = (req, res) => {
    models.Post.findAll({
        include: [{
            model: models.User,
            attributes: ['username']
        }],
        order: [['createdAt', 'DESC']]
    })
        .then(posts => {
            if (posts.length > null) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch(err => res.status(500).json(err))
}


exports.delete = async (req, res) => {
    console.log("delete")



        try {

            if (!req.body.id ) throw new Error("id du post a suprimer n'existe pas")

            
               const post = await models.Post.findByPk(req.body.id)

               res.maxime =" maxime"

               await post.destroy()

             
                
           

              
                res.status(200).json({message: "ok"})
                return 1
                      

              



            
                }catch (e) {
                    
                    
                    
           
              res.status(500).json({message : e.message})
              return 0

             
             
            
        }


    
   
};

exports.update = (req, res) => {
    
    let userOrder = req.body.userIdOrder;
    
    let id = utils.getUserId(req.headers.authorization);
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: id }
    })
        .then(user => {
            if (user && (user.isAdmin == true || user.id == userOrder)) {
                console.log('Modif ok pour le post :', req.body.postId);
                models.Post
                    .update(
                        {
                            content: req.body.newText,
                            attachement: req.body.newImg
                        },
                        { where: { id: req.body.postId } }
                    )
                    .then(() => res.end())
                    .catch(err => res.status(500).json(err))
            }
            else {
                res.status(401).json({ error: 'Utilisateur non autorisé à modifier ce post' })
            }
        }
        )
        .catch(error => res.status(500).json(error));
}
