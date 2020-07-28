import {connect} from 'react-redux'
import CypherResultTable from '../presentations/CypherResultTable'

const mapStateToProps = (state, ownProps) => {
    const { reqKey } = ownProps
    return {
        data : state.cypher.queryResult[reqKey] === undefined ? {'key' : '', 'data' : [], 'aliasList' : []} : state.cypher.queryResult[reqKey]
    }
}

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultTable);
