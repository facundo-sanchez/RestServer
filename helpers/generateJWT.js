const jwt = require('jsonwebtoken');

exports.generateJWT = (id='') => {
    return new Promise((resolve, reject) => {
        const payload = {id};

        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'1h'
        },(err,token)=>{
            if(err){
                console.log(err)
                reject('Error in generate Token');
            }else{
                resolve(token)
            }
        })
    })
}