import { expect, use, request } from 'chai';
import chaiHttp from 'chai-http';
import * as sinon from 'sinon';
import 'mocha';
import MongoConnection from '../src/services/persistance/mongoConnection';
import { Context } from '../src/middleware/context.middleware';
import app from '../src/index';

use(chaiHttp);

describe('express appp startup', () => {
    const sandbox = sinon.createSandbox();
    let MongoStub;
    let contextStub;
    beforeEach(() => {
        MongoStub = sandbox.stub(MongoConnection.getInstance(), 'newConnection');
        const context: Context = new Context();
        contextStub = sandbox.stub(context, 'contextSetter');
    });
    afterEach(() => {
        sandbox.restore();
    });
    it('start App', async (done) => {
        request(app).get('/ping').end((err, res) => {
            expect(res).to.have.status(200);
            // tslint:disable-next-line: no-unused-expression
            expect(res.body).to.exist;
            expect(res.text).to.equal('hello world!');
        });
        done();
    });
});
