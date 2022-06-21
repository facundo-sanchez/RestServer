const {Schema, model} = require('mongoose');
const user = require('./user');

const CategorySchema = Schema({
    name: {
        type: String,
        require: [true, 'Name is required '],
        unique:true
    },
    status: {
        type: Boolean,
        default: true,
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }

});

CategorySchema.methods.toJSON = function(){
    const {__v,status,...category} = this.toObject();
    // category.uid = _id
    return category
}

module.exports = model('Category',CategorySchema);