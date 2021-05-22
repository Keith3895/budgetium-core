import { User, Account } from '../datamodels';
import { UserService, AccountService } from '../../services';
export class Resolver {
    static userService = new UserService();
    static accountService = new AccountService();
    resolvers = {
        Query: {
            async me(parent, args, context, info) {

                let user: User = await Resolver.userService.getUserFromDB(context.user.email);
                if (user) {
                    return user;
                } else {
                    user = new User();
                    user.name = context.user.name;
                    user.email = context.user.email;
                    Resolver.userService.saveUser(context.user);
                    return user;
                }
            }
        },
        User: {
            async accounts(parent, args, context, info) {
                let accountList: Account[] = await Resolver.accountService.getAccounts(parent.email, args.limit, args.skip);
                return accountList;
            }
        },
        // Account:{

        // },
        Mutation: {
            addAccount(parent, args, context) {
                let newAccount: Account = new Account();
                newAccount.accountNumber = args.accountNumber;
                newAccount.active = args.active;
                newAccount.balance = args.balance;
                newAccount.user_id = context.user.email;
                Resolver.accountService.addAccounts(newAccount);
                return args;
            },
            async updateUser(parent, args, context) {
                await Resolver.userService.addMobile(context.user.email, args.mobile);
                let user: User = await Resolver.userService.getUserFromDB(context.user.email);
                if (user) {
                    return user;
                }
            }
        }
    };
}
