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

import React from 'react'

const SidebarSetting = ({changeTheme}) => {
    return (
        <div className="sidebar-gggg">
            <div className="sidebar sidebar-header">
                <h3>Configure</h3>
            </div>
            <div className="sidebar sidebar-body">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Themes</label>
                    <select className="form-control theme-switcher" onChange={(e) => changeTheme(e)}>
                        <option value="default">Default</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default SidebarSetting