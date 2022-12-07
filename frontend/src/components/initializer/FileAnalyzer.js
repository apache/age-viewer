/* eslint-disable no-unused-vars */
import Papa from 'papaparse';

const createNode = (node, graphName, currentQuery) => {
  const CREATENODE = `SELECT *
    FROM cypher('${graphName}', $$
        CREATE (a:${node.type} ${JSON.stringify(node.props)})
    $$) as (a agtype);`;

  currentQuery.push(CREATENODE);
};
/*
const createEdge = (edge, graphName, currentQuery) => {
    const CREATEEDGE = `SELECT *
    FROM cypher('${graphName}', $$
        MATCH
        (a:${edge.start_vertex_type} {id:${edge.start_id}}),
        (b:${edge.end_vertex_type} {id: ${edge.end_id}})
        CREATE (a)-[e:${edge.type} ${edge.properties}]->(b)
        RETURN e
    $$) as (e agtype);`

    currentQuery.push(CREATEEDGE);
}
*/
const createGraph = (graphName, currentQuery) => {
  const graph = `SELECT * FROM create_graph('${graphName}')`;
  currentQuery.push(graph);
};

const readData = async (file, type, resolve) => {
  Papa.parse(file, {
    complete: (res) => {
      const o = {
        type,
        props: res.data,
      };
      resolve(o);
    },
    header: true,
  });
};

const readEdges = async (/* edges */) => {
  //
};

const analyzeFiles = async ({ graphName, edges, nodes }) => {
  const query = [];
  createGraph(graphName, query);
  const resNodes = await Promise.all(nodes.map((node) => new Promise((resolve) => {
    readData(node.data, node.name, resolve);
  })));
  resNodes.forEach((n) => createNode(n, graphName, query));
  console.log(resNodes);
  console.log(query);
  /* const resEdges = await Promise.all(edges.map((edge) => new Promise((resolve) => {
    readEdges(edge.data, resolve);
  }))); */
  return query;
};

export default analyzeFiles;
