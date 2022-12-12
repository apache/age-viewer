const Papa = require('papaparse');
const { getDelete, toAgeProps } = require('../util/ObjectExtras');
const QueryBuilder = require('../models/QueryBuilder');

class GraphCreator {
    constructor(nodes, edges, graphName){
        this.nodefiles = nodes;
        this.edgefiles = edges;
        this.graphName = graphName;
        this.nodes = [];
        this.edges = [];
        this.query = {
            graph: [],
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
        graphName:this.graphName
    })){
        const CREATENODE = 
        `(:${type} ${toAgeProps(node)})`;

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
            (b:${endv} {id:${endid}})
            CREATE (a)-[e:${type} ${toAgeProps(eprops)}]->(b)`;
        
        qbuild.insertQuery(CREATEEDGE);

        this.query.edges.push(qbuild.getGeneratedQuery());
    }
    async createGraph(drop=false){
        if (drop){
            const dropgraph = `SELECT drop_graph('${this.graphName}', true);`;
            this.query.graph.push(dropgraph);
        }
        const creategraph = `SELECT create_graph('${this.graphName}');`;
        this.query.graph.push(creategraph);
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
        this.createGraph(req.body.dropGraph);

        this.nodes = await Promise.all(this.nodefiles.map((node) => new Promise((resolve) => {
            this.createNodeLabel(node.originalname);
            this.readData(node.buffer.toString('utf8'), node.originalname, resolve);
        })));
        this.nodes.forEach((nodeFile)=>{
            nodeFile.data.forEach((n)=>{
                this.createNode(n, nodeFile.type, nodeQueryBuilder);
            });
        });
        this.query.nodes.push(nodeQueryBuilder.getGeneratedQuery());
        
        this.edges = await Promise.all(this.edgefiles.map((edge) => new Promise((resolve) => {
            this.createEdgeLabel(edge.originalname);
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
