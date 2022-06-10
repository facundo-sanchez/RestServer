const mongoose = require('mongoose');


exports.dbConnection = async ()=>{
    try{    
        await mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true, == v 6.3.5 ya no se usa
            // useFindAndModify:false == v 6.3.5 ya no se usa
        });
        console.log('connect db')
    }catch(e){
        throw new Error(`Error database`);
    }

}