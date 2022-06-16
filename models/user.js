const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name:{
        type:String,
        require:[true,'Name required']
    },
    email:{
        type:String,
        require:[true,'Email required'],
        unique:true
    },
    password:{
        type:String,
        require:[true,'Password required']
    },
    img:{
        type:String,
        require:false
    },
    role:{
        type:String,
        require:true,
        emun:['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

UserSchema.methods.toJSON = function(){
    const {__v,password,_id,...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('User',UserSchema);