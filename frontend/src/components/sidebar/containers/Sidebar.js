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
import {changeTheme} from '../../../features/setting/SettingSlice'
import Sidebar from '../presentations/Sidebar'
import {getMetaData} from '../../../features/database/MetadataSlice'
import {addFrame} from '../../../features/frame/FrameSlice'

const mapStateToProps = (state) => {
    return {
        activeMenuName: state.navigator.activeMenu,
        database: state.database,
        isActive: state.navigator.isActive,
        metadata: state.metadata
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

const mapDispatchToProps = { changeTheme, getMetaData, addFrame }

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