module.exports = async (req, res, next) => {
    try {
        if (req.user.isAdmin) {
            next();
            return;
        }

        if (!(req.user.id === req.params.id)) throw new Error('id diferent du compte a suprimer');
        next();
    } catch (e) {
        res.status(500).json({ message: e.message || 'no account acces' });
    }
};
