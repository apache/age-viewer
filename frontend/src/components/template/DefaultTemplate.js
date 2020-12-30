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
import DefaultTemplate from './presentations/DefaultTemplate'

const mapStateToProps = (state)  => {
    return {
        theme: state.setting.theme
    }
}

export default connect(mapStateToProps)(DefaultTemplate);


/*
class DefaultTemplate extends Component {
    constructor(props) {
        super(props);

        this.state = {setting : store.getState().setting}
    }

    componentDidMount() {
        store.subscribe(function() {
            this.setState({setting : store.getState().setting});
        }.bind(this));
    }

    render() {
        return (
            <div>
                <input type="radio" className="theme-switch" name="theme-switch" id="default-theme" checked={this.state.setting.theme === 'default' ? true : false}/>
                <input type="radio" className="theme-switch" name="theme-switch" id="dark-theme" checked={this.state.setting.theme === 'dark' ? true : false}/>
                <div className="wrapper">
                    <Navigator />
                    <Sidebar />
                    <Contents />
                </div>

            </div>
        );
    }
}

export default DefaultTemplate
*/