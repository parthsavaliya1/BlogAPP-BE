const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true,
    },
    country:{
        type:String,
        require:true,
    },
    area: {
        type:String,
        require:true
    },
    pincode: {
        type:String,
        require:true
    },
    by: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }
})

const addressModel = mongoose.model('Address',addressSchema)

module.exports=addressModel