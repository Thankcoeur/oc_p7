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
    
    
    
  /**  models.User.findOne({
        attributes: ['id', 'email', 'username'],
        where: { id: id }
    })
        .then(user => {
            if (user !== null) {
                let content = req.body.content;
                if (req.file != undefined) {
                    attachmentURL = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                }
                else {
                    attachmentURL == null
                };
                if ((content == 'null' && attachmentURL == null)) {
                    res.status(400).json({ error: 'Rien à publier' })
                } else {
                    models.Post.create({
                        content: content,
                        attachement: attachmentURL,
                        UserId: user.id
                    })
                        .then((newPost) => {
                            res.status(201).json(newPost)
                        })
                        .catch((err) => {
                            res.status(500).json(err)
                        })
                };
            } else {
                res.status(400).json(error);
            }
        })
        .catch(error => res.status(500).json(error));

        */
}

//Afficher les posts sur le mur
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
      const id = req.body.id

        try {

         const post  = await models.Post.findByPk(id)

              if(post == null) throw new Error("post introuvable")

              if(post.attachement) {

                const filename = post.attachement.split('/images/')[1];
                fs.unlink(`images/${filename}`, (err) => {
                  if(err) throw new Error("erreur de supression")
                    


                    })


              }

                await models.Post.destroy({
                where: { id: id} })
           

              
            res.status(200).json(post)
                      

              



            
                }catch (e) {
            console.log(e)
             res.status(500).json(e)
            
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
