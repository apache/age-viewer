import {connect} from 'react-redux'
import {toggleMenu} from '../../../features/menu/MenuSlice'
import Navigator from '../presentations/Navigator'

const mapStateToProps = (state)  => {
    return {
        activeMenuName: state.navigator.activeMenu,
        menuList: state.navigator.menuList
    }
}
/*
const mapDispatchToProps = (dispatch) => {
    return {
        onClick: function(activeMenuName, selectedMenu) {
            if (activeMenuName === selectedMenu) {
                selectedMenu  = '';
            }
    
            dispatch({type: 'TOGGLE_MENU', activeMenu : selectedMenu})
        }
    }
}
*/
const mapDispatchToProps = { toggleMenu }

export default connect(mapStateToProps, mapDispatchToProps)(Navigator);

/*
import React, {Component} from 'react'
import store from '../../../app/store';
class NavigatorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {navigator : store.getState().navigator}
    }

    componentDidMount() {
        store.subscribe(function() {
            this.setState({navigator : store.getState().navigator});
        }.bind(this));
    }

    toggleMenu = (selectedMenu) => {
        if (this.state.navigator.activeMenu === selectedMenu) {
            selectedMenu  = '';
        }
        store.dispatch({type: 'TOGGLE_MENU', activeMenu : selectedMenu})
    }

    render() {
        const [ activeMenu, menuList ] = [this.state.navigator.activeMenu, this.state.navigator.menuList]
        return (
            <Navigator menuList={menuList} activeMenuName={activeMenu} onClick={this.toggleMenu} />
        );
    }

}

export default NavigatorContainer
*/