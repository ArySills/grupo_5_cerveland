function authMiddleware (req, res, next){
    if (req.session.usuarioLogueado == undefined){
        return res.redirect(303, '/register');
    }else {
next()
    }
}
module.exports = authMiddleware;