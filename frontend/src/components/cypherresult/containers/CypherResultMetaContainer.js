import { connect } from 'react-redux'
import CypherResultMeta from '../presentations/CypherResultMeta'

const mapStateToProps = (state, ownProps) => {
    const { reqKey } = ownProps

    let database = {}
    let query = ''
    let data = {}
    if (state.cypher.queryResult[reqKey]) {
        database = state.database
        query = state.cypher.queryResult[reqKey].response.query
        data = state.cypher.queryResult[reqKey].response.data
    }

    return {
        database: database,
        query: query,
        data: data
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultMeta);
