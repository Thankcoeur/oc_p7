const fs = require('fs')
const models = require('../models')
const PostSchema = require('../Schemas/PostSchema')

exports.add = async (req, res) => {
    try {
        const valid = PostSchema.validate(req.body)
        if (valid.error) throw new Error('Schema error')
        const { content } = req.body

        let attachement = null

        if (content == null) {
            throw new Error('rien a publier')
        }

        if (req.file) {
            attachement = `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
            }`
        } else attachement = null

        const post = await models.Post.create({
            content,
            attachement,
            UserId: req.user.id,
        })

        res.status(200).json(post)
    } catch (e) {
        res.status(500).json({ message: e.message || 'post non ajouté' })
    }
}

exports.listMsg = (req, res) => {
    models.Post.findAll({
        include: [
            {
                model: models.User,
                attributes: ['username'],
            },
        ],
        order: [['createdAt', 'DESC']],
    })
        .then((posts) => {
            if (posts.length > null) {
                res.status(200).json(posts)
            } else {
                res.status(404).json({ error: 'Pas de post à afficher' })
            }
        })
        .catch((err) => res.status(500).json(err))
}

exports.delete = async (req, res) => {
    try {
        if (!req.body.id) throw new Error("id du post a suprimer n'existe pas")
        const post = await models.Post.findByPk(req.body.id)

        if (post.attachement) {
            const filename = post.attachement.split('/images/')[1]
            fs.unlink(`images/${filename}`, async () => {
                await post.destroy()
            })
        } else {
            await post.destroy()
        }

        res.status(200).json({ message: 'ok' })
    } catch (e) {
        res.status(500).json({ message: e.message })
    }
}
