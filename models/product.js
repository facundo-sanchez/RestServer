const {Schema,model} = require('mongoose')

const ProductSchema = Schema({
    name:{
        type:String,
        required:[true,'The name is required']
    },
    status:{
        type:Boolean,
        required:true,
        default:true
    },
    price:{
        type:Number,
        default:0,
        required:false
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required: [true,'The category is required']
    },
    description:{
        type:String,
        required:false,
        default:'N/A'
    },
    available:{
        type:Boolean,
        default:true
    }
})

ProductSchema.methods.toJSON = function(){
    const {__v,status,...product} = this.toObject();
    return product;
}
// CategorySchema.methods.toJSON = function(){
//     const {__v,status,...category} = this.toObject();
//     // category.uid = _id
//     return category
// }


module.exports = model('Product',ProductSchema)