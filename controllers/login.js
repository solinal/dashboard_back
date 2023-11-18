const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var Usuarios = initModels(sequelize).usuarios;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { useInflection } = require('sequelize');

module.exports = {
    //Creacion de usuarios
    signup: async (req, res)=> {
        const isEmailExist = await Usuarios.findOne({where: {correo: req.body.email}});
        if (isEmailExist) {
            return res.status(400).json({error: 'Email ya registrado'})
        }
        let salt = await bcrypt.genSalt(10);
        let token = await bcrypt.hash(req.body.password1, salt);
        let contra = JSON.stringify(token);
        let cantidad = await Usuarios.count();
        const newuser = new Usuarios({
            // Ya se corrigio, si no te funciona prueba la vieja confiable "DROP TABLE Usuarios CASCADE"
            nombres: req.body.name,
            apellidos: req.body.lastname,
            correo: req.body.email,
            celular: req.body.cellphone,
            contrasena: contra
        });
        try {
            const savedUser = await newuser.save();
            res.json({
                error: null,
                data: savedUser
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }

    },
    logoogle: async (req, res)=>{
        console.log(req.body);
        const user = await Usuarios.findOne({where: {correo: req.body.user.email}});
        if (!user) {
            let cantidad = await Usuarios.count();
            const newuser = new Usuarios({
                id_usuario: cantidad,
                id_tipousuario: 2,
                nombres: req.body.user.given_name,
                apellidos: req.body.user.family_name,
                correo: req.body.user.email,
                token_google: req.body.token,
                account_name: req.body.user.name, //TODO: CORREGIR, se supone que user esta vacio.
                profile_name: req.body.user.given_name,
                url_foto: req.body.user.picture
            });
            try {
                let savedUser = await newuser.save();
                res.json({
                    error: null,
                    data: savedUser
                })
            } catch (error) {
                console.log(error)
                res.status(400).json({error})
            }
        }else{
            res.json({
                error: null,
                data: user
            })
        }  
    },
    login: async (req, res)=>{
        try {
        const user = await Usuarios.findOne({where: {correo: req.body.email}});
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
        const validPassword = await bcrypt.compare(req.body.password, JSON.parse(user.contrasena));
        if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' });
        
        token = jwt.sign({
            name: user.nombres,
            id_type: user.id_tipousuario
        }, process.env.TOKEN_SECRET)
        
        var data = {
            email: user.correo,
            nombres: user.nombres,
            apellidos: user.apellidos,
            telefono: user.celular,
            accountName: user.account_name,
            profileName: user.profile_name,
            url_foto: user.url_foto
        }
            res.header('auth-token', token).json({
            error: null,
            data: data
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({error})
        }
        

    },

    reset: async (req, res)=>{
        const user = await Usuarios.findOne({where: {correo: req.body.email}});
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
        var data = {
            email : req.body.email,
            codigo1: Math.floor((Math.random() * 9) + 1).toString(),
            codigo2: Math.floor((Math.random() * 9) + 1).toString(),
            codigo3: Math.floor((Math.random() * 9) + 1).toString(),
            codigo4: Math.floor((Math.random() * 9) + 1).toString(),
        };
        var token_gg = data.codigo1  + data.codigo2 + data.codigo3 + data.codigo4;
        var updt = {
            correo: data.email,
            token_password: token_gg
        };
        const changedPass = await Usuarios.update(updt,{where: {correo: req.body.email}});
        if(!changedPass) return res.status(400).json({ error: 'Codigo no generado' });

        res.json({
            error: null,
            message: "Contraseña acualizada",
            data: data
        })
    },

    verification: async (req, res)=>{
        const user = await Usuarios.findOne({where:{correo: req.body.correo, token_password: req.body.token_google}});
        if (!user) return res.status(400).json({ error: 'Codigo incorrecto' });
        res.json({
            error: null,
            data: "Codigo correcto"
        })
    },

    newPassword: async (req, res)=>{
        let salt = await bcrypt.genSalt(10);
        let token = await bcrypt.hash(req.body.contrasena, salt);
        let contra = JSON.stringify(token);

        var updt ={
            contrasena: contra
        }
        const user = await Usuarios.update(updt,{where: {correo: req.body.correo}});
        if (!user) return res.status(400).json({ error: 'No cambio contraseña' });

        res.json({
            error: null,
            data: "Contraseña cambiada"
        })
    },

    logout: function(req, res){
        Usuarios.findAll({attributes: { exclude: ["contrasena"] }})
        .then(result => {
            res.status(200).json({
                message: "Sesion cerrada",
                post: result
            })
        })
        .catch(error => {
            res.status(500).json({
                message: "usuario no encontrado",
                error: error
            })
        })
    }
};
