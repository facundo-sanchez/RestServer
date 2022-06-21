const { request, response, json } = require('express');
const User = require('../models/user');
const bycript = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const googleVerify = require('../helpers/google.verify');


exports.authUser = async (req = request, res = response) => {
    const msgError = 'Email/Password incorrect or not active User';

    const { email, password } = req.body;


    try {
        //verificar si email existe y user activo
        const isUser = await User.findOne({ email }).findOne({ $and: [{ status: true }] });
        if (!isUser) {
            return res.status(400).json({
                msg: msgError
            })
        }

        //verificar user activo
        // const isUserActive = await User.findOne(isUser).findOne({$and:[{status:true}]})
        // if (!isUserActive) {
        //     return res.status(400).json({
        //         msg: 'User is not active'
        //     })
        // }

        //verificar password
        const userValidPassword = bycript.compareSync(password, isUser.password);
        if (!userValidPassword) {
            return res.status(400).json({
                msg: msgError
            })
        }

        //generar jwt
        const token = await generateJWT(isUser.id);
        res.json({
            isUser,
            token
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: 'Ups error'
        })
    }

}

exports.authGoogle = async (req, res = response) => {
    const { id_token } = req.body

    try {
        const { name, picture, email } = await googleVerify(id_token);

        let user = await User.findOne({email})

        if(!user){
            const data = {
                name,
                email,
                img:picture,
                password:'::',
                google:true
            };

            user = new User(data);
            await user.save();
        }

        //si el user existe en db
        if(!user.status){
            return res.status(401).json({
                msg:'The account is bloqued'
            });
        }

        const token = await generateJWT(user.id);

        res.status(200).json({
            msg: 'Google sing in',
            token,
            user
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'The token not verify'
        })

    }

}