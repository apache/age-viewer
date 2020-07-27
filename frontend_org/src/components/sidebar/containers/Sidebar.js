import {connect} from 'react-redux'
import {changeTheme} from '../../../features/setting/SettingSlice'
import Sidebar from '../presentations/Sidebar'

const mapStateToProps = (state) => {
    return {
        activeMenuName: state.navigator.activeMenu
    }
}

/*
const  mapDispatchToProps = (dispatch) => {
    return {
        onThemeChange: function(e) {
            const selectedTheme = e.target.value
            dispatch({type: 'CHANGE_THEME', theme : selectedTheme})
        }
    }
}
*/

const mapDispatchToProps = { changeTheme }

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

/*
import React, {Component} from 'react'
import store from '../../../app/store'
class SidebarContainer extends Component {
    constructor(props) {
        super(props);        
        this.state = {navigator : store.getState().navigator}
    } 

    componentDidMount() {
        store.subscribe(function() {
            this.setState({navigator : store.getState().navigator});
        }.bind(this));
    }
    
    changeTheme = (e) => {
        console.log(e);
        const selectedTheme = e.target.value
        store.dispatch({type: 'CHANGE_THEME', theme : selectedTheme})
    } 

    render() {
        const activeMenu  = this.state.navigator.activeMenu
        return (
            <Sidebar activeMenuName={activeMenu} onThemeChange={this.changeTheme} />
        );
    }

}

export default SidebarContainer
*/