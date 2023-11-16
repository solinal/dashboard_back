const verifyTypeUser = (req, res, next) => {
    const { user } = req.body;
    //TODO: Verify Type User.
    if(user.tipousuario.plan !== "Administrador") {
        res.status(404).json({ message: "No se encontro la ruta!"})
    }

    //TODO: Continue the permission check.
    next();
}