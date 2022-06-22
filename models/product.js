const {Schema,model} = require('mongoose')

const ProductSchema = Schema({
    name:{
        type:String,
        require:[true,'The name is required']
    },
    status:{
        type:Boolean,
        require:true,
        default:true
    },
    price:{
        type:Number,
        default:0,
        require:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        require: [true,'The category is required']
    },
    description:{
        type:String,
        require:false,
        default:'N/A'
    },
    available:{
        type:Boolean,
        default:true
    }
})

ProductSchema.methods.toJSON = function(){
    const {__v,status,...product} = this.Object();
    return product;
}

module.exports = model('Product',ProductSchema)