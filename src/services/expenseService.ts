import { Expense } from "../models";
import { DbOperation } from './persistance/dbOperations';

export class ExpenseService {
    private dbOperation: DbOperation;
    constructor(dbOperation?) {
        if (dbOperation) {
            this.dbOperation = dbOperation;
        } else {
            this.dbOperation = new DbOperation();
        }
    }

    addExpense(expenseObj: Expense) {
        return this.dbOperation.insertOne('expense', expenseObj);
    }
}
