const mongoose = require('mongoose');

const likeSchema= new mongoose.Schema({
    postid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
}, {timestamps:{createdAt:true}})

const likeModel = mongoose.model('Like',likeSchema);
module.exports=likeModel