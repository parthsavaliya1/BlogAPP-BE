const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required: function() {
            return this.authMethod === "email";
        }
    },
    profilePicture: {
        type:String
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    authMethod: {
        type: String,
        enum: ['email', 'google'],
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
