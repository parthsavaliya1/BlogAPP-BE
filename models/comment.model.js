const mongoose = require('mongoose');

const commentSchema= new mongoose.Schema({
    postid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    content: {
        type:String,
        require:true,
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:{createdAt:true}})

const commentModel = mongoose.model('Comment',commentSchema);
module.exports=commentModel