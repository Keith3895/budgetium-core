import * as mongodb from 'mongodb';

export default class MongoConnection {
    static mongoInstance;
    connection;
    static getInstance(): MongoConnection {
        if (!MongoConnection.mongoInstance) {
            MongoConnection.mongoInstance = new MongoConnection();
        }
        return MongoConnection.mongoInstance;
    }
    async newConnection() {
        this.connection = await mongodb.MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true });
    }
}
