const app = require('../src/app');
const {connectionForm} = require('./testDB');
const pathCreate = require('path');
const request = require('supertest');
const expect = require('chai').expect;
const agent = request.agent(app);
request.Test.prototype.attachMultiple = function(files, key){
    files.forEach(([name, path])=>{
        this.attach(key, path, name);
    });
    return this;
}

/*function(files, key){
    files.forEach(([name, path])=>{
        this.attach(key, path, name);
    });
    return this;
}*/






const START_PATH = '/api/v1'

describe('Graph Creation', ()=>{
    const path = `${START_PATH}/db/connect`
    before((done)=>{
        console.log('running before');

        agent
            .post(path)
            .send({...connectionForm})
            .end((err, res)=>{
                expect(err).to.be.null;
                expect(res).property('status').to.equal(200)
                console.log('results', res.status)
                done();
            });

        });



    it('creates a graph', (done)=>{
        // create csv file with a node
        //  request to init
        const urlPath = `${START_PATH}/cypher/init`
        const nodesFilePath = [['Make', getPathForFile('make.csv')],['Model', getPathForFile('model.csv')]]
        const edgesFilePath = [['has_model', getPathForFile('has_model.csv')]]
        console.log(nodesFilePath, edgesFilePath)
        const formData = {
            nodes:nodesFilePath,
            edges:edgesFilePath,
            graphName:connectionForm.database,
            dropGraph:'true'
        }
        agent
            .post(urlPath)
            .field('graphName', formData.graphName)
            .field('dropGraph', formData.dropGraph)
            .attachMultiple(nodesFilePath, 'nodes')
            .attachMultiple(edgesFilePath, 'edges')
            .end((err, res)=>{
                expect(err).to.be.null;
                expect(res.status).to.equal(204);
                
                done();
            });
        /*
        formData.nodes.forEach(([name, path])=>{

            attachFiles(agent2, 'nodes', path, name)
        })
        formData.edges.forEach(([name, path])=>{
            attachFiles(agent2, 'edges', path, name)
        })
        agent2.end((err, res)=>{
            expect(err).to.be.null;
            expect(res).to.have.status(204)
            done();
        });
        */
    });
    after((done)=>{
        const urlPath = `${START_PATH}/cypher`
        const query = `SELECT * FROM drop_graph(${connectionForm.database}, true)`
        agent
            .post('/')
            .send({
            })
    })
    
});

function getPathForFile(fname){
    const dataPath = 'test-data'
    return pathCreate.join(__dirname, dataPath, fname); 
}

function attachFiles(ob, key, path, name){
    ob.attach(key, path, name);
}