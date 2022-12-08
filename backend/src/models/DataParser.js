const Papa = require('papaparse');
const { getDelete } = require('../util/ObjectExtras');

class GraphCreator {
    constructor(nodes, edges, graphName){
        this.nodefiles = nodes;
        this.edgefiles = edges;
        this.graphName = graphName;
        this.nodes = [];
        this.edges = [];
        this.query = [];
    }

    async createNode(node, type){
        const CREATENODE = 
        `SELECT * FROM cypher('${this.graphName}', $$
            CREATE (a:${type} {${JSON.stringify(node)}})
        $$) as (a agtype)`;

        this.query.push(CREATENODE);
    }
    async createEdge(edge, type){
        const startv = getDelete(edge, "start_vertex_type");
        const startid = getDelete(edge, "start_id");
        const endv = getDelete(edge, "end_vertex_type");
        const endid = getDelete(edge, "end_id");
        const eprops = edge;
        const CREATEEDGE = `SELECT *
        FROM cypher('${graphName}', $$
            MATCH
            (a:${startv} {id:${startid}}),
            (b:${endv} {id: ${endid}})
            CREATE (a)-[e:${type} {${eprops}}]->(b)
            RETURN e
        $$) as (e agtype)`;
        this.query.push(CREATEEDGE);
    }
    async createGraph(){
        const graph = `SELECT * FROM create_graph('${this.graphName}')`;
        this.query.push(graph);
    }
    async readData(file, type, resolve){
        Papa.parse(file, {
            complete: (res) => {
                console.log(res);
                const o = {
                    type,
                    data:res.data
                }
                resolve(o);
            },
            header: true,
        });
    }
    async parseData(){
        this.createGraph();
        // promise will return [] of objects where data property contains each node object
        this.nodes = await Promise.all(this.nodefiles.map((node) => new Promise((resolve) => {
            this.readData(node.buffer.toString('utf8'), node.originalname, resolve);
        })));
        this.nodes.forEach((nodeFile)=>{
            nodeFile.data.forEach((n)=>{
                this.createNode(n, nodeFile.type);
            });
        });
        
        this.edges = await Promise.all(this.edgefiles.map((edge) => new Promise((resolve) => {
            this.readData(edge.buffer.toString('utf8'), edge.originalname, resolve);
        })));
        this.edges.forEach((edgeFile)=>{
            edgeFile.data.forEach((e)=>{
                this.createNode(e, edgeFile.type);
            });
        });
        console.log(this.query);
        return this.query;
        
    }
};

module.exports = GraphCreator;
