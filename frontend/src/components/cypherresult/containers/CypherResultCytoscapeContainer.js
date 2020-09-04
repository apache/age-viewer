import { connect } from 'react-redux'
import CypherResultCytoscape from '../presentations/CypherResultCytoscape'
import {setLabels} from '../../../features/cypher/CypherSlice'
import { generateCytoscapeElement } from '../../../features/cypher/CypherUtil'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    const generateElements = () => {
        return generateCytoscapeElement(state.cypher.queryResult[refKey], false)
        
    }
    return {
        data: generateElements()
    }
}

const mapDispatchToProps = { setLabels }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultCytoscape);
