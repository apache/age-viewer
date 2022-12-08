const Papa = require('papaparse');
const { getDelete } = require('../util/ObjectExtras');
const QueryBuilder = require('../models/QueryBuilder');

class GraphCreator {
    constructor(nodes, edges, graphName){
        this.nodefiles = nodes;
        this.edgefiles = edges;
        this.graphName = graphName;
        this.nodes = [];
        this.edges = [];
        this.query = {
            graph: '',
            nodes: [],
            edges: []
        };
    }

    async createNode(node, type, qbuild = new QueryBuilder({
        graphName:this.graphName
    })){
        const CREATENODE = 
        `(:${type} ${JSON.stringify(node)})`;

        if (qbuild.clause === ''){
            qbuild.create();
        }
        
        qbuild.insertQuery(CREATENODE);
    }
    async createEdge(edge, type, qbuild = new QueryBuilder(
        {
            graphName: this.graphName,
            returnAs: 'e'
        }
    )){
        const startv = getDelete(edge, "start_vertex_type");
        const startid = getDelete(edge, "start_id");
        const endv = getDelete(edge, "end_vertex_type");
        const endid = getDelete(edge, "end_id");
        const eprops = edge;
        const CREATEEDGE = 
        `MATCH
            (a:${startv} {id:${startid}}),
            (b:${endv} {id: ${endid}})
            CREATE (a)-[e:${type} ${JSON.stringify(eprops)}]->(b)`;
        
        qbuild.insertQuery(CREATEEDGE);

        this.query.edges.push(qbuild.getGeneratedQuery());
    }
    async createGraph(){
        const graph = `SELECT * FROM create_graph('${this.graphName}')`;
        this.query.graph = graph;
    }
    async readData(file, type, resolve){
        Papa.parse(file, {
            complete: (res) => {
                console.log(res);
                res.errors.forEach((e)=>{
                    if (e.type === 'FieldMismatch'){
                        res.data.splice(e.row, 1);
                    }
                })
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
        const nodeQueryBuilder = new QueryBuilder({
            graphName:this.graphName,
            returnAs:'v'
        });
        this.createGraph();
        // promise will return [] of objects where data property contains each node object
        this.nodes = await Promise.all(this.nodefiles.map((node) => new Promise((resolve) => {
            this.readData(node.buffer.toString('utf8'), node.originalname, resolve);
        })));
        this.nodes.forEach((nodeFile)=>{
            nodeFile.data.forEach((n)=>{
                this.createNode(n, nodeFile.type, nodeQueryBuilder);
            });
        });
        this.query.nodes.push(nodeQueryBuilder.getGeneratedQuery());
        
        this.edges = await Promise.all(this.edgefiles.map((edge) => new Promise((resolve) => {
            this.readData(edge.buffer.toString('utf8'), edge.originalname, resolve);
        })));
        this.edges.forEach((edgeFile)=>{
            edgeFile.data.forEach((e)=>{
                this.createEdge(e, edgeFile.type);
            });
        });
        console.log(this.query);
        return this.query;
        
    }
};

module.exports = GraphCreator;
