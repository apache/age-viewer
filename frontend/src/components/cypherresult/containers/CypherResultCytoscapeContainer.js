import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

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
        let nodeLegend = {}
        let edgeLegend = {}

        if (data) {
            data['response']['data']['rows'].forEach((row, index) => {
                for (const [alias, val] of Object.entries(row)) {
                    let labelName = val['label']
                    if (val['start'] && val['end']) {
                        if (!edgeLegend.hasOwnProperty(labelName)) { edgeLegend[labelName] = getRandomColor() }
                        edges.push(
                            { group: 'edges', data: { id: val.id, source: val.start, target: val.end, label: val.label, backgroundColor: edgeLegend[labelName] }, alias: alias, backgroundColor: nodeLegend[labelName], classes: ['node'] }
                        )
                    } else {
                        if (!nodeLegend.hasOwnProperty(labelName)) { nodeLegend[labelName] = getRandomColor() }
                        nodes.push(
                            { group: 'nodes', data: { id: val.id, label: val.label, backgroundColor: nodeLegend[labelName] }, alias: alias, backgroundColor: nodeLegend[labelName], classes: ['node'] }
                        )
                    }
                }
            });

        }
        return { legend : {nodeLegend: nodeLegend, edgeLegend: edgeLegend}, elements : { nodes: nodes, edges: edges }}

    }


    return {
        data: generateCytoscapeElement(state.cypher.queryResult[refKey]),
        isActive: state.navigator.isActive
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
