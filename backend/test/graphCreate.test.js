import app from '../src/app';
import connectionForm from './testDB';

const chai = require('chai');
const chttp = require('chai-http');
const expect = chai.expect;

chai.use(chttp);
const agent = chai.request.agent(app)
const START_PATH = '/api/v1'

describe('Graph Creation', ()=>{
    const path = `${START_PATH}/db/connect`
    before(()=>{
        agent
            .post(path)
            .type('form')
            .send(connectionForm)
    })
    beforeEach((done)=>{
        
        done();
    });
    it('creates a node', ()=>{
        // create csv file with a node
        //  request to init
        expect('1').to.be.equal('1')
    });
    
});
