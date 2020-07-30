import { connect } from 'react-redux'
import CypherResultMeta from '../presentations/CypherResultMeta'

const mapStateToProps = (state, ownProps) => {
    const { refKey } = ownProps

    let database = {}
    let query = ''
    let data = {}
    if (state.cypher.queryResult[refKey]) {
        database = state.database
        query = state.cypher.queryResult[refKey].response.query
        data = state.cypher.queryResult[refKey].response.data
    }

    return {
        database: database,
        query: query,
        data: data
    }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultMeta);
