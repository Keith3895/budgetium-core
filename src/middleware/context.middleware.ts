import { UserService } from '../services';
export class Context {
    static userService: UserService;
    constructor() {
        Context.userService = new UserService();
    }
    async contextSetter({ req }) {
        const token = req.headers.authorization || '';
        if (token === '')
            throw new Error('authorization header not sent.');
        try {
            const user = await Context.userService.getUser(token);
            if (!user) throw new Error('you must be logged in');
            return { user };
        } catch (e) {
            throw new Error('you must be logged in');
        }
    }
}
