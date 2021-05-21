import MongoConnection from './mongoConnection';
export class DbOperation {
    // tslint:disable-next-line: no-trailing-whitespace
    client;
    db = process.env.DB;
    constructor(mongoClient?) {
        if (mongoClient) {
            this.client = mongoClient;
        } else {
            this.client = MongoConnection.getInstance().connection;
        }
    }
    async insertOne(collection: string, object: any): Promise<any> {
        try {
            return await this.client.db(this.db).collection(collection).insertOne(object);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    async findOne(collection: string, filter: object, options?: object): Promise<any> {
        try {
            return await this.client.db(this.db).collection(collection).findOne(filter, options);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    async find(collection: string, filter: object, options?: object): Promise<any> {
        try {
            return await this.client.db(this.db).collection(collection).find(filter, options).toArray();
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
    async updateOne(collection: string, filter: object, updateDoc: object, options?: object): Promise<any> {
        try {
            return await this.client.db(this.db).collection(collection).updateOne(filter, updateDoc, options);
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}
