import express from 'express';
import { Resolver, typeDefs } from './models';
import { ApolloServer } from 'apollo-server-express';
import MongoConnection from './services/persistance/mongoConnection';
import { config } from 'dotenv';
import { Context } from './middleware/context.middleware';
config();
const app = express();
const context = new Context();
const resolvers = new Resolver().resolvers;
const apServer = new ApolloServer({
    typeDefs, resolvers,
    context: context.contextSetter
});

apServer.start();
apServer.applyMiddleware({ app });
app.get('/ping', (req, res) => {
    res.send('hello world!');
});
MongoConnection.getInstance().newConnection().catch(e => console.error);
app.listen(3000);

export default app;
