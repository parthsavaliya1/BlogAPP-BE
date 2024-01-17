const {gql} = require('apollo-server');

const typeDefs = gql`

   type Query {
    users:[User]
    address:[Address]
    posts:[Post]
    comments:[Comment]
    likes:[Like]
    postByUser:[Post]
   }

   type User{
    _id:ID
    firstName:String
    lastName:String
    email:String
    profilePicture:String
    following:[User]
    followers:[User]
    address:[Address]
    posts:[Post]
    comments:[Comment]
    likes:[Like]
   }

   type Address{
    _id:ID
    city:String
    state:String
    country:String
    area:String
    pincode:String
    by:ID
   }

   type Post {
    _id:ID
    title:String
    content:String
    tags:[String]
    author:ID
    createdAt:String
    comments:[Comment]
   }

   type Comment{
    _id:ID
    content:String
    postid:ID
    author:ID
   }

   type Like{
    _id:ID
    postid:ID
    author:ID
   }

   type Mutation{
    signupUser(userNew:UserInput!):User
    signInUser(userSignIn:UserSignInInput!):Token
    createAddress(userAddress:AddressInput!):Address
    createPost(userPost:PostInput!):Post
    createComment(userComment:CommentInput):Comment
    createLike(userLike:LikeInput):Like
   }

   input LikeInput{
      postId:ID
   }

   input PostInput{
    title:String
    content:String
    tags:[String]
   }

   input CommentInput{
    content:String
    postId:ID
   }

   input AddressInput{
    city:String
    country:String
    area:String
    state:String
    pincode:String
   }

   type Token{
    token:String
    user:User
   }

   input UserSignInInput {
    email:String
    password:String
   }

   input UserInput{
    firstName:String
    lastName:String
    email:String
    password:String
    profilePicture:String
   }
`

module.exports={typeDefs}