import { User, Account } from '../datamodels';
import { UserService, AccountService } from '../../services';

export const resolvers = {

    Query: {
        async me(parent, args, context, info) {
            let userService = new UserService();
            let user: User = await userService.getUserFromDB(context.user.email);
            if (user) {
                return user;
            } else {
                user = new User();
                user.name = context.user.name;
                user.email = context.user.email;
                userService.saveUser(context.user);
                return user;
            }
        }
    },
    User: {
        async accounts(parent, args, context, info) {
            let accountService = new AccountService();
            let accountList: Account[] = await accountService.getAccounts(parent.email, args.limit, args.skip);
            return accountList;
        }
    },
    // Account:{

    // },
    Mutation: {
        addAccount(parent, args, context) {
            let newAccount: Account = new Account();
            let accountService = new AccountService();
            newAccount.accountNumber = args.accountNumber;
            newAccount.active = args.active;
            newAccount.balance = args.balance;
            newAccount.user_id = context.user.email;
            accountService.addAccounts(newAccount);
            return args;
        },
        async updateUser(parent, args, context) {
            let userService = new UserService();
            await userService.addMobile(context.user.email, args.mobile);
            let user: User = await userService.getUserFromDB(context.user.email);
            if (user) {
                return user;
            }
        }
    }
};
