import { Account } from '../models';
import { DbOperation } from './persistance/dbOperations';

export class AccountService {
    private dbOperation: DbOperation;
    constructor(dbOperation?) {
        if (dbOperation) {
            this.dbOperation = dbOperation;
        } else {
            this.dbOperation = new DbOperation();
        }
    }
    addAccounts(account: Account) {
        this.dbOperation.insertOne('accounts', account);
    }
    async getAccounts(email: string, limit?: number, skip?: number): Promise<Account[]> {
        let result: Account[] = await this.dbOperation.find('accounts', { 'user_id': email },{limit:limit,skip:skip});
        return result;
    }
}
