const User = require('../models/User');
const jwt = require('jsonwebtoken');


const authentication = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: payload._id, tokens: token });
        if (!user) {
            return res.status(401).send({ message: 'No estas autorizado' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema con el token' })
    }
}

const isAuthor = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        if (post.userId.toString() !== req.user._id.toString()) { 
            return res.status(403).send({ message: 'Este no es tu post' });
        }
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).send({ error, message: 'Ha habido un problema de autorizacion' })
    }
}

const isAdmin = async(req, res, next) => {
    const admins = ['admin'];
    if (!admins.includes(req.user.role)) {
        return res.status(403).send({
            message: 'No tienes permiso'
        });
    }
    next();
}

module.exports = { authentication, isAdmin, isAuthor }