const { request, response } = require('express');

exports.validateRole = (roles) => {

    return (req, res = response, next) => {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: `User has no role`
            });
        }
        if(roles.includes(req.userAuth.role)){
            next();
        }else{
            return res.status(401).json({
                msg: `The user does not have these roles ${roles}`
            });
        }
    }
}

exports.validateIsAdmin = async (req = request, res = response, next) => {
    try {
        if (!req.userAuth) {
            return res.status(500).json({
                msg: `User has no role`
            });
        }
        const { role, name } = req.userAuth

        if (role && role === 'ADMIN_ROLE') {
            next();
        } else {
            return res.status(400).json({
                msg: `User ${name} not admin`
            });
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: `Server error ${error}`
        });
    }


}