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
}
type Account{
    accountNumber: String!
    balance: Float!
    active: Boolean!
}
type Mutation{
    addAccount(accountNumber: String!, balance: Float!, active: Boolean!):Account
    updateUser(mobile:Int):User
    addExpense(amount: Int!, expense_description: String, category: String):Expense
}
`;
