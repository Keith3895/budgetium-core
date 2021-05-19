import express from 'express';
import { resolvers, typeDefs } from './models';
import { ApolloServer } from 'apollo-server-express';
import MongoConnection from './services/persistance/mongoConnection';
import { config } from 'dotenv';
config();
const app = express();
const apServer = new ApolloServer({ typeDefs, resolvers });
apServer.start();
apServer.applyMiddleware({ app });
app.get('/ping', (req, res) => {
    res.send('hello world!');
});
MongoConnection.getInstance().newConnection().catch(e => console.error);
app.listen(3000);

export default app;