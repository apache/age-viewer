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
import { ColoredLine, SubLabelLeft } from './SidebarComponents'
import { saveToCookie } from '../../../features/cookie/CookieUtil'

const SidebarSetting = ({theme, maxNumOfFrames, maxNumOfHistories, maxDataOfGraph, maxDataOfTable, changeTheme, changeMaxNumOfFrames, changeMaxNumOfHistories, changeMaxDataOfGraph, changeMaxDataOfTable, resetSetting}) => {

    return (
        <div className="sidebar-setting">
            <div className="sidebar sidebar-header">
                <h4>Configuration</h4>
            </div>
            <div className="sidebar sidebar-body">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Themes</b></label>
                    <ColoredLine />
                    <select className="form-control theme-switcher" value={theme} onChange={(e) => [saveToCookie('theme', e.target.value), changeTheme(e)]}>
                        <option value="default">Default</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div className="form-group pt-4">
                    <label htmlFor="exampleFormControlSelect1"><b>Frames</b></label>
                    <ColoredLine />
                    <fieldset className="form-group">
                        <SubLabelLeft label="Maximum Number of Frames:" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxFrames" name="maxFrames" min="0" value={maxNumOfFrames} onChange={(e) => [saveToCookie('maxNumOfFrames', e.target.value), changeMaxNumOfFrames(e)]}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <SubLabelLeft label="Max Number of Histories:" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxHistories" name="maxHistories" value={maxNumOfHistories} min="0" onChange={(e) => [saveToCookie('maxNumOfHistories', e.target.value), changeMaxNumOfHistories(e)]}/>
                    </fieldset>
                </div>
                <div className="form-group pt-4">
                    <label htmlFor="exampleFormControlSelect1"><b>Data Display</b></label>
                    <ColoredLine />
                    <fieldset className="form-group">
                        <SubLabelLeft label="Maximum Data of Graph Visualization" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxGraphData" name="maxGraphData" value={maxDataOfGraph} min="0" onChange={(e) => [saveToCookie('maxDataOfGraph', e.target.value), changeMaxDataOfGraph(e)]}/>
                    </fieldset>
                    <fieldset className="form-group">
                        <SubLabelLeft label="Maximum Data of Table Display" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxTableData" name="maxTableData" value={maxDataOfTable} min="0" onChange={(e) => [saveToCookie('maxDataOfTable', e.target.value), changeMaxDataOfTable(e)]}/>
                    </fieldset>
                </div>
                <div className="form-group pt-4">
                    <fieldset className="form-group">
                    <button type="button" className="btn btn-info btn-sm btn-block" onClick={() => [
                        resetSetting()
                    ]}  >Reset Configuration</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default SidebarSetting