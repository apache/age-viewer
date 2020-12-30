/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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