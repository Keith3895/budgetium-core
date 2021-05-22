import { expect } from 'chai';
import * as sinon from 'sinon';


import { Account, Resolver } from '../../src/models';

describe('testing graphql resolver', () => {
    const sandbox = sinon.createSandbox();
    let userServiceMock;
    let accountServiceMock;
    let resolverInstance:Resolver;
    beforeEach(() => {
        resolverInstance = new Resolver();
        userServiceMock = sandbox.stub(Resolver.userService);
        accountServiceMock = sandbox.stub(Resolver.accountService);
    });
    afterEach(() => {
        sandbox.restore();
    });
    describe('query.me',()=>{
        it('test query User', async () => {
            userServiceMock.getUserFromDB.resolves({ user: { name: 'keith', email: 'test' } });
            let result = await resolverInstance.resolvers.Query.me({}, {}, { user: { name: 'keith', email: 'test' } }, {});
            expect(result).to.be.an('object');
        });
        it('test query User when user is not there.', async () => {
            userServiceMock.getUserFromDB.resolves(null);
            userServiceMock.saveUser.withArgs({ user: { name: 'keith', email: 'test' } });
            let result = await resolverInstance.resolvers.Query.me({}, {}, { user: { name: 'keith', email: 'test' } }, {});
            expect(result).to.be.an('object');
        });
    });
    describe('user.account',()=>{
        it('test query User\'s accounts.', async () => {
            let newAcc = new Account();
            newAcc.accountNumber='23123';
            accountServiceMock.getAccounts.resolves([newAcc]);
            let result = await resolverInstance.resolvers.User.accounts({ user: { name: 'keith', email: 'test' } }, {}, {}, {});
            expect(result).to.be.an('array');
        });
    });

});
