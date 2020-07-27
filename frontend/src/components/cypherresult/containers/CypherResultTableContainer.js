import {connect} from 'react-redux'
import CypherResultTable from '../presentations/CypherResultTable'

const mapStateToProps = (state, ownProps) => {
    const { reqKey } = ownProps
    console.log("!!!" , state)
    console.log("!!!" , state.cypher)
    console.log("!!!" , state.cypher.queryResult)
    console.log("!!!" , reqKey)
    console.log("!!!" , state.cypher.queryResult[reqKey])
    return {
        data : state.cypher.queryResult[reqKey]
    }
}

const mapDispatchToProps = {  }

export default connect(mapStateToProps, mapDispatchToProps)(CypherResultTable);
