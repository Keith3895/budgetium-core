export class User {
    _id: string;
    email: string;
    name: string;
    mobile: number;
}

export class Account {
    _id: string;
    accountNumber: string;
    balance: number;
    active: boolean;
    user_id: string;
}
export interface Transaction {
    _id?: string;
    amount: number;
    timestamp?: Date;
    tag?: string[];
    account_id?: string;
    user_id:string;
}
export class Expense implements Transaction {
    _id?: string;
    amount: number;
    timestamp?: Date;
    tag?: string[];
    account_id?: string;
    type?: string;
    user_id:string;
    constructor() {
        this.type = 'SPEND';
    }
}
export class Income implements Transaction {
    _id: string;
    amount: number;
    timestamp: Date;
    tag: string[];
    account_id: string;
    type: string;
    user_id:string;
    constructor() {
        this.type = 'INCOME';
    }
}
