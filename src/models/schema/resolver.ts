const users = [
    {
        email: 'Elizabeth@mail.o',
        name: 'Elizabeth Bennet'
    },
    {
        email: 'Fitzwilliam@mail.o',
        name: 'Fitzwilliam Darcy'
    }
];

export const resolvers = {

    Query: {
        me(parent, args, context, info) {
            return users.find(user => user.email === args.email);
        }
    }
};
