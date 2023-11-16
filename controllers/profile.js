const sequelize = require('../models/index.js').sequelize;
var initModels = require("../models/init-models");
var Usuarios = initModels(sequelize).usuarios;
const bcrypt = require('bcrypt');

module.exports = {

    imgsrc: async (req, res)=> {
        let updt = {
            url_foto: req.body.url_foto
        }
        const imgSrc = await Usuarios.update(updt,{where: {correo: req.body.correo}});
        if (!imgSrc) return res.status(400).json({ error: 'No cambio imagen' });
        
        res.json({
            error: null,
            message: "Imagen cambiada",
            data: updt
        })
    },

    deleteimgsrc:  async (req, res)=> {
        let updt = {
            url_foto: null
        }
        const imgSrc = await Usuarios.update(updt,{where: {correo: req.body.correo}});
        if (!imgSrc) return res.status(400).json({ error: 'No cambio imagen' });

        res.json({
            error: null,
            data: "Imagen eliminada"
        })
    },

    guardarAjustes:async (req, res)=> {
        let data = {
            account_name: req.body.accountname,
            profile_name: req.body.profilename,
            correo: req.body.correo,
            nombres: req.body.nombre,
            apellidos: req.body.apellido,
            celular: req.body.celular,
            actualpassword: req.body.actualpassword,
            newpassword: req.body.newpassword
        }
        if(data.newpassword == null){
            let updt_on_top = {
                nombres: data.nombres,
                apellidos: data.apellidos,
                correo: data.correo,
                celular: data.celular,
                account_name: data.account_name,
                profile_name: data.profile_name   
            }
            var user = await Usuarios.update(updt_on_top,{where: {correo: req.body.email}});
            if (!user) return res.status(400).json({ error: 'No actualizo los datos' });
            res.json({
                error: null,
                message: "Informacion actualizada",
                data: data
            }) 
        }else{
            var user = await Usuarios.findOne({where: {correo: req.body.email}});
            const validPassword = await bcrypt.compare(data.actualpassword, JSON.parse(user.contrasena));
            if (!validPassword){
                return res.status(400).json({ error: 'contraseña actual incorrecta' });
            } else {
                let salt = await bcrypt.genSalt(10);
                let token = await bcrypt.hash(data.newpassword, salt);
                let contra = JSON.stringify(token);
                let updt = {
                    nombres: data.nombres,
                    apellidos: data.apellidos,
                    correo: data.correo,
                    contrasena: contra,
                    celular: data.celular,
                    account_name: data.account_name,
                    profile_name: data.profile_name 
                }
                var u = await Usuarios.update(updt,{where: {correo: req.body.email}});
                if (!u) return res.status(400).json({ error: 'No actualizo los datos' });
                res.json({
                    error: null,
                    message: "Informacion actualizada",
                    data: data
                }) 
            }  
        }
    }

};