import exp from 'constants';
import app from '../src/app';
import connectionForm from './testDB';

const fs = require('fs');

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



    it('creates a graph', (done)=>{
        // create csv file with a node
        //  request to init
        const path = `${START_PATH}/cypher/init`
        const nodesFilePath = ['./test-data/make.csv', './test-data/model.csv']
        const edgesFilePath = ['./test-data/has-model.csv']
        const formData = {
            nodes:nodesFilePath.map((path)=>{
                return fs.readFileSync(path);
            }),
            edges:edgesFilePath.map((path)=>{
                return fs.readFileSync(path);
            }),
            graphName:'TEST_GRAPH',
            dropGraph:'true'
        }
        agent
            .post(path)
            .type('form')
            .send(formData)
            .end((err, res)=>{
                expect(err).to.be.null;
                expect(res).to.have.status(204)
                done();
            });
    });
    
});
