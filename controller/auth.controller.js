const { request, response, json } = require('express');
const User = require('../models/user');
const bycript = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');


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

exports.authGoogle = async (req,res=response) => {
    const {id_token} = req.body
    
    res.status(200).json({
        msg:'ok',
        id_token
    })
}