import axios from 'axios';
import { User } from '../models';
import { DbOperation } from '.';
export class UserService {
    dbOperation: DbOperation;
    constructor(dbOperation?) {
        if (dbOperation) {
            this.dbOperation = dbOperation;
        } else {
            this.dbOperation = new DbOperation();
        }

    }
    async getUserFromDB(email): Promise<User> {
        let resut: User = await this.dbOperation.findOne('user', { 'email': email });
        return resut;
    }
    saveUser(user: User) {
        this.dbOperation.insertOne('user', user);
    }
    async getUser(token) {
        try {
            const result = await axios.get(`${process.env.OIDC_URL}/api/me`, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            return result.data;
        } catch (e) {
            return Promise.reject(e);
        }
    }
    async addMobile(email: string, mobile: number) {
        return this.dbOperation.updateOne('user', { 'email': email }, { $set: { 'mobile': mobile } });
    }
}
