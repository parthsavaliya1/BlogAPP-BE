const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    content: {
        type:String,
        require:true,
    },
    tags: {
        type:[String]
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:true})

const postModel = mongoose.model('Post',postSchema);
module.exports=postModel