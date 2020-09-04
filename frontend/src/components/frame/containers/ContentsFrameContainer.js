import {connect} from 'react-redux'
import {removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import ContentsFrame from '../presentations/ContentsFrame'
import {addAlert} from '../../../features/alert/AlertSlice'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { removeFrame, pinFrame, addAlert }

export default connect(mapStateToProps, mapDispatchToProps)(ContentsFrame);
