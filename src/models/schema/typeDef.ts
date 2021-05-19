import { gql } from 'apollo-server-express';

export const typeDefs = gql`
type Query{
    me(email:String!): User
}
type User{
    email:String!
    name:String!
}
`;
