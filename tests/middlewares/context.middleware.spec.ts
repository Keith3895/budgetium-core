import { expect } from 'chai';
import * as sinon from 'sinon';

import { UserService } from '../../src/services';

import { Context } from '../../src/middleware/context.middleware';

describe('context middleware test.', () => {
    let sandbox = sinon.createSandbox();
    let userServiceMock;
    let contextInstance: Context;
    beforeEach(() => {
        contextInstance = new Context();
        userServiceMock = sandbox.stub(Context.userService, 'getUser');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('token not sent', async () => {
        try {
            await contextInstance.contextSetter({ req: { headers: {} } });
        } catch (e) {
            expect(e).to.be.an('error');
        }
    });
    it('token sent in headers.', async () => {
        userServiceMock.resolves({ name: 'keith' });
        let result = await contextInstance.contextSetter({ req: { headers: { authorization: 'bearer' } } });
        expect(result).to.be.an('object');
        expect(result).to.be.deep.equal({ user: { name: 'keith' } });
    });

    it('token sent in headers, but api fails.', async () => {
        try {
            userServiceMock.rejects('error');
            await contextInstance.contextSetter({ req: { headers: { authorization: 'bearer' } } });
        } catch (e) {
            expect(e).to.be.an('error');
        }
    });
    it('token sent in headers, but User is not valid.', async () => {
        try {
            userServiceMock.resolves(null);
            await contextInstance.contextSetter({ req: { headers: { authorization: 'bearer' } } });
        } catch (e) {
            expect(e).to.be.an('error');
        }
    });
});