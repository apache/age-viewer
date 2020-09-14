import {connect} from 'react-redux'
import {removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import { generateCytoscapeMetadataElement } from '../../../features/cypher/CypherUtil'
import ServerStatusFrame from '../presentations/ServerStatusFrame'

const mapStateToProps = (state) => { 

    const generateElements = () => {
        return generateCytoscapeMetadataElement(state.metadata.rows)
        
    }

    return {
        serverInfo: state.database,
        data: generateElements()
    }
}

const mapDispatchToProps = { removeFrame, pinFrame }

export default connect(mapStateToProps, mapDispatchToProps)(ServerStatusFrame);
