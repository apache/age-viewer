import { connect } from 'react-redux';
import {
  changeMaxDataOfGraph,
  changeMaxDataOfTable,
  changeMaxNumOfFrames,
  changeMaxNumOfHistories,
  changeTheme,
  resetSetting,
} from '../../../features/setting/SettingSlice';
import SidebarSetting from '../presentations/SidebarSetting';

const mapStateToProps = (state) => ({
  theme: state.setting.theme,
  maxNumOfFrames: state.setting.maxNumOfFrames,
  maxNumOfHistories: state.setting.maxNumOfHistories,
  maxDataOfGraph: state.setting.maxDataOfGraph,
  maxDataOfTable: state.setting.maxDataOfTable,
});

const mapDispatchToProps = {
  changeTheme,
  changeMaxNumOfFrames,
  changeMaxNumOfHistories,
  changeMaxDataOfGraph,
  changeMaxDataOfTable,
  resetSetting,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarSetting);
