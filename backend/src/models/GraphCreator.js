const Papa = require('papaparse');
const { getDelete, toAgeProps } = require('../util/ObjectExtras');
const QueryBuilder = require('./QueryBuilder');

class GraphCreator {
    constructor({nodes, edges, graphName, dropGraph}={}){
        this.nodefiles = nodes;
        this.edgefiles = edges;
        this.dropGraph = dropGraph;
        this.graphName = graphName;
        this.nodes = [];
        this.edges = [];
        this.query = {
            graph: {
                drop: null,
                create: null,
            },
            labels:[],
            nodes: [],
            edges: []
        };
    }
    async createNodeLabel(label){
        const makeLabel = `SELECT create_vlabel('${this.graphName}', '${label}');`
        this.query.labels.push(makeLabel);
    }

    async createEdgeLabel(label){
        const makeLabel = `SELECT create_elabel('${this.graphName}', '${label}');`;
        this.query.labels.push(makeLabel); 
    }

    async createNode(node, type, qbuild = new QueryBuilder({
        graphName:this.graphName,
        returnAs:'v'
    })){
        const CREATENODE = 
        `(:${type} ${toAgeProps(node)})`;

        if (qbuild.clause === ''){
            qbuild.create();
        }
        
        qbuild.insertQuery(CREATENODE);
        this.query.nodes.push(qbuild.getGeneratedQuery());
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
            (a:${startv} {id:'${startid}'}),
            (b:${endv} {id:'${endid}'})
            CREATE (a)-[e:${type} ${toAgeProps(eprops)}]->(b)`;
        
        qbuild.insertQuery(CREATEEDGE);

        this.query.edges.push(qbuild.getGeneratedQuery());
    }
    async createGraph(drop=false){
        if (drop){
            const dropgraph = `SELECT * FROM drop_graph('${this.graphName}', true);`;
            this.query.graph.drop = dropgraph;
        }
        const creategraph = `SELECT * FROM create_graph('${this.graphName}');`;
        this.query.graph.create = creategraph;
    }
    async readData(file, type, resolve){
        Papa.parse(file, {
            complete: (res) => {
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
        this.createGraph(this.dropGraph);

        this.nodes = await Promise.all(this.nodefiles.map((node) => new Promise((resolve) => {
            this.createNodeLabel(node.originalname);
            this.readData(node.buffer.toString('utf8'), node.originalname, resolve);
        })));
        this.nodes.forEach((nodeFile)=>{
            nodeFile.data.forEach((n)=>{
                this.createNode(n, nodeFile.type);
            });
        });
        this.edges = await Promise.all(this.edgefiles.map((edge) => new Promise((resolve) => {
            this.createEdgeLabel(edge.originalname);
            this.readData(edge.buffer.toString('utf8'), edge.originalname, resolve);
        })));

        this.edges.forEach((edgeFile)=>{
            edgeFile.data.forEach((e)=>{
                this.createEdge(e, edgeFile.type);
            });
        });
        return this.query;
        
    }
};

module.exports = GraphCreator;
