import {connect} from 'react-redux'
import {removeFrame, pinFrame} from '../../../features/frame/FrameSlice'
import ContentsFrame from '../presentations/ContentsFrame'

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = { removeFrame, pinFrame }

export default connect(mapStateToProps, mapDispatchToProps)(ContentsFrame);
