import {connect} from 'react-redux'
import {executeCypherQuery} from '../../../features/cypher/CypherSlice'
import CypherResultTable from '../presentations/CypherResultTable'
import { createImmutableStateInvariantMiddleware } from '@reduxjs/toolkit'

const mapStateToProps = (state, ownProps) => {
    const { reqKey } = ownProps
    console.log("!!!" , state.cypher.queryResult[reqKey])
    return {
        queryResult : state.cypher.queryResult[reqKey]
    }
}

const mapDispatchToProps = { executeCypherQuery }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultTable);
