const models = require('../models')

module.exports = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            next()
            return
        }

        const post = await models.Post.findByPk(req.body.id)
        if (!post) throw new Error('post non trouvé')
        if (!(post.UserId === req.user.id))
            throw new Error(
                'user id user ne correspond pas avec user id du post'
            )

        next()
        return
    } catch (e) {
        res.status(500).json({ message: 'acces impossible' })
    }
}
