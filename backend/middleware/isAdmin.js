// verify is Admin
module.exports = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            next()
        }
    } catch (e) {
        res.status(500).json({ message: "l' utilisateur n' est pas admin" })
    }
}
