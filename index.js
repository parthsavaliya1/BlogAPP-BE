const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const jwt = require('jsonwebtoken')

require('dotenv').config();
require('./database.config');

// Import your models
require('./models/user.model');
require('./models/address.model');

const { resolvers } = require('./resolvers');
const { typeDefs } = require('./schema.gql');

const jwtSecret = process.env.JWT_SECRET;

const context = ({req}) => {
    const {authorization} = req.headers;
    if(authorization) {
      const {userId} =  jwt.verify(authorization,jwtSecret);
      return {userId}
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:context,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

server.listen(5000).then(({ url }) => {
    console.log('Server running at ', url);
});
