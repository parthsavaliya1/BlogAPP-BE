const mongoose = require('mongoose');
const User = require('./models/user.model');
const Address = require('./models/address.model');
const Post = require('./models/post.model')
const Comment = require('./models/comment.model')
const Like = require('./models/like.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const resolvers = {
    Query: {
        users: async () => await User.find({}),
        address: async () => await Address.find({}),
        posts: async () => await Post.find({}),
        comments: async () => await Comment.find({}),
        likes: async () => await Like.find({}),
        postByUser: async (_, { }, { userId }) => {
            if (!userId) {
                throw new Error('You must be logged in to retrieve posts.');
            }

            return await Post.find({ author: userId });
        },
    },
    User: {
        address: async (users) => await Address?.find({ by: users?._id }),
        posts: async (users) => await Post?.find({ author: users?._id }),
        comments: async (users) => await Comment?.find({ author: users?._id }),
        likes: async (users) => await Like?.find({ author: users?._id })
    },
    Post: {
        comments: async (posts) => await Comment?.find({ postid: posts?._id })
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const { email, password, authMethod } = userNew;

            if (authMethod === "email" && (!password || password.trim() === "")) {
                throw new Error("Password is required for email sign-up");
            }

            const hashedPassword = password ? await bcrypt.hash(password, 12) : null;

            const newUser = new User({
                ...userNew,
                password: hashedPassword,
                authMethod,
            });

            return await newUser.save();
        },

        signInUser: async (_, { userSignIn }) => {
            const { email, password, authMethod } = userSignIn;

            if (authMethod === "email" && (!password || password.trim() === "")) {
                throw new Error("Password is required for email sign-in");
            }

            if (authMethod === "google") {

                const isCheckUser = await User.findOne({ email, authMethod: "google" });
                if (!isCheckUser) {

                    throw new Error("User not found for Google sign-in");
                }

                const token = jwt.sign({ userId: isCheckUser?._id }, jwtSecret);
                const user = {
                    token: token,
                    user: isCheckUser?._doc
                };

                return { ...user };
            }


            const isCheckUser = await User.findOne({ email });
            if (!isCheckUser) {
                throw new Error(`User doesn't exist with the given email`);
            }

            const matchedPass = await bcrypt.compare(password, isCheckUser.password);

            if (!matchedPass) {
                throw new Error('Invalid Credential...');
            }

            const token = jwt.sign({ userId: isCheckUser?._id }, jwtSecret);
            const user = {
                token: token,
                user: isCheckUser?._doc
            };

            return { ...user };
        },
        createAddress: async (_, { userAddress }, { userId }) => {
            if (!userId) {
                throw new Error('You must be login first')
            }

            const newAddress = new Address({
                ...userAddress,
                by: userId
            })

            return await newAddress.save()
        },

        createPost: async (_, { userPost }, { userId }) => {
            if (!userId) {
                throw new Error('You must be login first')
            }



            const newPost = new Post({
                ...userPost,
                tags: userPost.tags || [],  // Ensure tags is an array
                author: userId,
            });

            return await newPost.save()
        },

        createComment: async (_, { userComment }, { userId }) => {
            if (!userId) {
                throw new Error('You must be login first')
            }
            const newComment = new Comment({
                ...userComment,
                author: userId,
            });

            if (userComment.postId) {
                newComment.postid = userComment.postId;
            }

            return await newComment.save();
        },

        createLike: async (_, { userLike }, { userId }) => {
            if (!userId) {
                throw new Error('You must be login first')
            }

            const newLike = new Like({
                ...userLike,
                author: userId
            })

            if (userLike.postId) {
                newLike.postid = userLike.postId;
            }

            return await newLike.save()
        }
    }
};

module.exports = { resolvers };
