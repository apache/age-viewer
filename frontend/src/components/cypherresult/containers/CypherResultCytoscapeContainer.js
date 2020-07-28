import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'

const mapStateToProps = (state, ownProps) => {
    const { reqKey } = ownProps

    const getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const generateCytoscapeElement = (data) => {
        let nodes = []
        let edges = []
        let nodeColors = {}
        let edgeColors = {}

        if (data) {
            data['data'].forEach((row, index) => {
                for (const [alias, val] of Object.entries(row)) {
                    let labelName = val['label']
                    if (val['start'] && val['end']) {
                        if (!edgeColors.hasOwnProperty(labelName)) { edgeColors[labelName] = getRandomColor() }
                        edges.push(
                            { group: 'edges', data: { id: val.id, source: val.start, target: val.end, label: val.label, backgroundColor: edgeColors[labelName] }, alias: alias, backgroundColor: nodeColors[labelName], classes: ['node'] }
                        )
                    } else {
                        if (!nodeColors.hasOwnProperty(labelName)) { nodeColors[labelName] = getRandomColor() }
                        nodes.push(
                            { group: 'nodes', data: { id: val.id, label: val.label, backgroundColor: nodeColors[labelName] }, alias: alias, backgroundColor: nodeColors[labelName], classes: ['node'] }
                        )
                    }
                }
            });

        }
        return [{nodeColors: nodeColors, edgeColors: edgeColors}, { nodes: nodes, edges: edges }]

    }


    return {
        data: generateCytoscapeElement(state.cypher.queryResult[reqKey])
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
