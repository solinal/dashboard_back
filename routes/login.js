var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login');
var verifyToken = require('../routes/validate-token');
/*
router.get('/', function (req, res, next) {
    Usuarios.findAll({
        attributes: { exclude: ["url_foto"] },
        where: {
            [Op.and]: [
                { correo: "daniel@gmail.com" },
                { contrasena: "123456" }

            ]
        }
    })
        .then(result => {
            res.status(200).json({
                get: result
            })
        }).catch(error => {
            res.status(500).json({
                message: "",
                error: error
            })
        })
})*/

router.post('/login', loginController.login);


router.post('/signup', loginController.signup); 

router.post('/reset', loginController.reset);
  
router.get('/logout', loginController.logout);

router.post('/verification-code',loginController.verification);

router.post('/newpass',loginController.newPassword);

router.post('/logoogle', loginController.logoogle);
  /*function (req, res, next) {
    
    const u = {
        correo: req.body.email
    }
    Usuarios.findOne({
        where: { 
            [Op.and]: [
                { correo: u.correo },
            ]
        }
    })
    .then(result => {
        res.status(200).json({
            message: "correo enviado",
            post: result
        })
    })
    .catch(error => {
        res.status(500).json({
            message: "usuario no encontrado",
            error: error
        })
    })
    
})


router.post('/test', verifyToken, function (req, res, next) {
    console.log(req.data);
    res.json('info secreta');
})

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).json('no autorizado');
    }

    //BEARER TOKEN
    const token = req.headers.authorization.substr(7);
    if (token !== '') {
        const content = jwt.verify(token, 'ETC');
        req.data = content;
        next();
    } else {
        res.status(401).json('token vacio');
    }
    console.log(token)

}*/


module.exports = router;