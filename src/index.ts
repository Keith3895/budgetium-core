import express from 'express';
import { resolvers, typeDefs } from './models';
import { ApolloServer } from 'apollo-server-express';
import MongoConnection from './services/persistance/mongoConnection';
import { config } from 'dotenv';
import { UserService } from './services';
config();
const app = express();

const apServer = new ApolloServer({
    typeDefs, resolvers,
    context: async ({ req }) => {
        const token = req.headers.authorization || '';
        try {
            const user = await new UserService().getUser(token);
            if (!user) throw new Error('you must be logged in');
            return { user };
        } catch (e) {
            throw new Error('you must be logged in');
        }
    }
});

apServer.start();
apServer.applyMiddleware({ app });
app.get('/ping', (req, res) => {
    res.send('hello world!');
});
MongoConnection.getInstance().newConnection().catch(e => console.error);
app.listen(3000);

export default app;
