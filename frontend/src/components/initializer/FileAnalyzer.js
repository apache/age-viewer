

const getNodes = (files) => {
    //
};

const getEdges = (files) => {
    //
};

const AnalyzeFiles = ({gname, edgeFiles, nodeFiles}) => {
    const graph = {};
    graph.edges = getEdges(edgeFiles);
    graph.nodes = getNodes(nodeFiles);
    graph.name = gname;

    return graph;
};

export default AnalyzeFiles;