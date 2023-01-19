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
    before((done)=>{
        console.log('running before');

            agent
            .post(path)
            .type('form')
            .send(connectionForm)
            .end((err, res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                console.log('results', res.status)
                done();                
            });

        });



    it('creates a node', (done)=>{
        // create csv file with a node
        //  request to init
        expect('1').to.be.equal('1')
        done();
    });
    
});
