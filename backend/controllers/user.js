//Import
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let models = require('../models');
let utils  = require('../utils/jwtUtils')

exports.signup = async (req, res) => {





    try {
        const user = await models.User.findOne({
            attributes: ['email'],
            where: { email: req.body.email }
        })

        if (user !== null) throw { message: "utilisateur existe " }


        const hash = await bcrypt.hash(req.body.password, 10)
        if (hash == null) throw {}



        const newUser = await models.User.create({
            email: req.body.email,
            username: req.body.username,
            password: hash,
            isAdmin: false
        })

        if (newUser == null) throw null

        res.status(200).json({ message: "utilisateur  ajouté" })









    } catch (e) {
        res.status(e.status || 500).json({ message: e || e.message || "erreur server" })


    }


















};

exports.login = async  (req, res) => {

   try {

        const user = await models.User.findOne({
            where: { username: req.body.username }
        })

        if (user == null) throw { mesage: "utilisateur n'existe pas ", status: 404 }

        const compare = await bcrypt.compare(req.body.password, user.password)
        if (!compare) throw { message: "invalid passeword", status: 403 }

        res.status(200).json({
            userId: user.id,
            token: utils.generateToken(user),
            isAdmin: user.isAdmin
        })





   } catch(e) {
       console.log(e)

    res.status(e.status || 500).json({ message: e || e.message || "erreur server" })

   }




};

exports.getUser = (req, res) => {
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where: { id: req.user.id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};



exports.delete = async (req, res) => {


    try {
       
        const posts = await models.Post.findAll({
            where : { UserId : req.user.id}
        })

        posts.forEach( async (post) => { await post.destroy() })



     await req.user.destroy() 

      res.status(200).json({message : "utilisateur suprimé"})





    }
    catch (e){
        console.log(e)

        res.status(e.status || 500).json({ message : e.message || "erreur server" })



    }





   

}