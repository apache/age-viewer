import {connect} from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'

const mapStateToProps = (state, ownProps) => {
    const { reqKey } = ownProps

    const generateCytoscapeElement = (data) => {
        let nodes = []
        let edges = []
        data['data'].forEach((row, index) => {
            for (const [alias, val] of Object.entries(row)) {
                if (val['start'] && val['end']) {
                edges.push(
                    {group: 'edges', data: {id: val.id, source: val.start, target: val.end, label: val.label}, classes: ['node']}
                )
                } else {
                nodes.push(
                    {group: 'nodes', data: {id: val.id, label: val.label}, classes: ['node']}
                )
                }
            }
        });
        return {nodes: nodes, edges: edges}

    }
    
    
    return {
        data : state.cypher.queryResult[reqKey] === undefined ? {'key' : '', 'data' : [], 'aliasList' : []} : generateCytoscapeElement(state.cypher.queryResult[reqKey])
    }
}

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
