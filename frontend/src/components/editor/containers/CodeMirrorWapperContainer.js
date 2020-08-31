import {connect} from 'react-redux'
import CodeMirrorWapper from '../presentations/CodeMirrorWapper'
const mapStateToProps = (state, ownProps)  => {
    return {
        reqString : state.editor.reqString
    }
}


const mapDispatchToProps = { }

export default connect(mapStateToProps, mapDispatchToProps)(CodeMirrorWapper);
