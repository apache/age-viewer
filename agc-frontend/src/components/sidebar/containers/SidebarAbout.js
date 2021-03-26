import { connect } from 'react-redux';
import SidebarAbout from '../presentations/SidebarAbout';

const mapStateToProps = (state) => ({
  releaseDate: state.setting.releaseDate,
  version: state.setting.version,
  license: state.setting.license,
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(SidebarAbout);
