import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'
import {setLabels} from '../../../features/cypher/CypherSlice'
import { generateCytoscapeElement } from '../../../features/cypher/CypherUtil'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    const generateElements = () => {
        return generateCytoscapeElement(state.cypher.queryResult[refKey]['rows'], state.setting.maxDataOfGraph, false)
        
    }
    return {
        data: generateElements(),
        maxDataOfGraph: state.setting.maxDataOfGraph,
        maxDataOfTable: state.setting.maxDataOfTable
    }
}

const mapDispatchToProps = { setLabels }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
