//Import
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let models = require('../models');
const fs = require('fs')
const SignupSchema = require('../Schemas/SignupSchema')
require('dotenv').config()
exports.signup = async (req, res) => {




              



    try {

       const  valid = SignupSchema.validate(req.body)
       if ( valid.error) throw new Error("erreur de validation")


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
        console.log(e)
        res.status(e.status || 500).json({  message : e.message || "erreur server" })


    }


















};

exports.login = async (req, res) => {

    try {

        const user = await models.User.findOne({
            where: { username: req.body.username }
        })

        if (user == null) throw { mesage: "utilisateur n'existe pas ", status: 404 }

        const compare = await bcrypt.compare(req.body.password, user.password)
        if (!compare) throw { message: "invalid passeword", status: 403 }

        res.status(200).json({
            userId: user.id,
            token: jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin
              },
                process.env.TOKENUSER,
                {
                  expiresIn: '24h'
                }),
            isAdmin: user.isAdmin
        })





    } catch (e) {
        console.log(e)

        res.status(e.status || 500).json({ message: e || e.message || "erreur server" })

    }




};

exports.getUsers = (req, res) => {
    console.log('getUsers')
    models.User.findAll({
        attributes: ['id', 'email', 'username', 'isAdmin'],

    })
        .then((user) => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};



exports.getUser = async (req, res) => {
    console.log('getUsers')
    const user  =  await  models.User.findOne({
        attributes: ['id', 'email', 'username', 'isAdmin'],
        where : { id : req.params.id}

    })
    if ( !user) throw new Error("utilisateur invalid")
    res.status(200).json(user)

};
















exports.delete = async (req, res) => {
console.log("delete")

    try {
        const user = await models.User.findByPk(req.params.id)
        if(!user) throw new Error("pas d'utilisateur  a ce non")
 
        const posts = await models.Post.findAll({
            where: { UserId: req.params.id  }
        })

        posts.forEach(async (post) => { 

            if (post.attachement) {
                const filename = post.attachement.split('/images/')[1];
                fs.unlink(`images/${filename}`, async  () => {
                    
                     await post.destroy()
                    
                    
                })
            
    
    
            }else {
                await post.destroy()
            }
            
            
            
            
             })

             

             await user.destroy()



        

        res.status(200).json({ message: "utilisateur suprimé" })





    }
    catch (e) {
        console.log(e)

        res.status(e.status || 500).json({ message: e.message || "erreur server" })



    }







}