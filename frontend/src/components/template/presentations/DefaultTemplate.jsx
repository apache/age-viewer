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
import Navigator from '../../navigator/containers/Navigator'
import Sidebar from '../../sidebar/containers/Sidebar'
import Contents from '../../contents/containers/Contents'

const DefaultTemplate = ({ theme }) => {

    return (
        <div>
            <input type="radio" className="theme-switch" name="theme-switch" id="default-theme" checked={theme === 'default' ? true : false} readOnly />
            <input type="radio" className="theme-switch" name="theme-switch" id="dark-theme" checked={theme === 'dark' ? true : false} readOnly />
            <div className="wrapper">
                <Navigator />
                <Sidebar />
                <Contents />
            </div>

        </div>
    )
}

export default DefaultTemplate