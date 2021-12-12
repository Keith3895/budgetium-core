import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query{
    me: User
}
type User{
    email:String!
    name:String!
    mobile:Int
    accounts(limit:Int, skip:Int): [Account]
}
type Expense{
    amount: Int!
    expense_description: String
    category: String
    user_id: String
}

type Account{
    accountNumber: String!
    balance: Float!
    active: Boolean!
}

input ExpenseInput{
    amount: Int!
    expense_description: String
    category: String
}
type Mutation{
    addAccount(accountNumber: String!, balance: Float!, active: Boolean!):Account
    updateUser(mobile:Int):User
    addExpense(input:ExpenseInput):Expense
}
`;
