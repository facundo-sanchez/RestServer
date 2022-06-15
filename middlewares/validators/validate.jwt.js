const jwt = require('jsonwebtoken');
const { request, response } = require('express');
const User = require('../../models/user')

exports.validateJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({
            msg: 'Not token'
        });
    }
    try {
        jwt.verify(token, process.env.SECRETORPRIVATEKEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({
                    msg: 'Token invalid'
                })
            } else {
                const userAuth = await User.findById(decoded.id).findOne({$and:[{status:true}]});
                if(userAuth){
                    req.userAuth = userAuth
                    next();
                }else{
                    return res.status(401).json({
                        msg:'User not available'
                    });
                }
            }
        });
    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: 'Token error'
        })
    }


}