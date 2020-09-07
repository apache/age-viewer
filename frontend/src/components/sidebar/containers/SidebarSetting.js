import {connect} from 'react-redux'
import {changeTheme} from '../../../features/setting/SettingSlice'
import SidebarSetting from '../presentations/SidebarSetting'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = { changeTheme }

export default connect(mapStateToProps, mapDispatchToProps)(SidebarSetting);
