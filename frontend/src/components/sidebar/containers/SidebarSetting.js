import {connect} from 'react-redux'
import {changeTheme, changeMaxNumOfFrames, changeMaxNumOfHistories, changeMaxDataOfGraph, changeMaxDataOfTable, resetSetting} from '../../../features/setting/SettingSlice'
import SidebarSetting from '../presentations/SidebarSetting'

const mapStateToProps = (state) => {
    return {
        theme: state.setting.theme,
        maxNumOfFrames: state.setting.maxNumOfFrames,
        maxNumOfHistories: state.setting.maxNumOfHistories,
        maxDataOfGraph: state.setting.maxDataOfGraph,
        maxDataOfTable: state.setting.maxDataOfTable
    }
}

const mapDispatchToProps = { changeTheme, changeMaxNumOfFrames, changeMaxNumOfHistories, changeMaxDataOfGraph, changeMaxDataOfTable, resetSetting }

export default connect(mapStateToProps, mapDispatchToProps)(SidebarSetting);
