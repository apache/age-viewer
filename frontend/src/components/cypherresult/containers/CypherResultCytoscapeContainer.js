import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'
import {setLabels} from '../../../features/cypher/CypherSlice'
import { generateCytoscapeElement, reGenerateCytoscapeElements } from '../../../features/cypher/CypherUtil'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    const generateElements = () => {
        if (Object.keys(state.cypher.labels.nodeLabels).length > 0) {
            return reGenerateCytoscapeElements(state.cypher.queryResult[refKey], state.cypher.labels)
        } else {
            return generateCytoscapeElement(state.cypher.queryResult[refKey])
        }
        
    }
    return {
        data: generateElements()
    }
}

const mapDispatchToProps = { setLabels }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
