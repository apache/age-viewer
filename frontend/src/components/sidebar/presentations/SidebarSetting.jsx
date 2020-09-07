import React from 'react'
import { ColoredLine, SubLabelLeft } from './SidebarComponents'

const SidebarSetting = ({changeTheme}) => {
    return (
        <div className="sidebar-setting">
            <div className="sidebar sidebar-header">
                <h4>Configuration</h4>
            </div>
            <div className="sidebar sidebar-body">
                <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1"><b>Themes</b></label>
                    <ColoredLine />
                    <select className="form-control theme-switcher" onChange={(e) => changeTheme(e)}>
                        <option value="default">Default</option>
                        <option value="dark">Dark</option>
                    </select>
                </div>
                <div className="form-group pt-4">
                    <label htmlFor="exampleFormControlSelect1"><b>Frames</b></label>
                    <ColoredLine />                    
                    <fieldset className="form-group">
                        <SubLabelLeft label="Maximum Number of Frames:" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxFrames" name="maxFrames" min="0"/>
                    </fieldset>                    
                    <fieldset className="form-group">
                        <SubLabelLeft label="Max Number of Histories:" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxHistories" name="maxHistories" min="0"/>
                    </fieldset>
                </div>
                <div className="form-group pt-4">
                    <label htmlFor="exampleFormControlSelect1"><b>Data Display</b></label>
                    <ColoredLine />                    
                    <fieldset className="form-group">
                        <SubLabelLeft label="Maximum Data of Graph Visualization" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxGraphData" name="maxGraphData" min="0"/>
                    </fieldset>                    
                    <fieldset className="form-group">
                        <SubLabelLeft label="Maximum Data of Table Display" classes="py-1"></SubLabelLeft>
                        <input type="number" className="form-control" id="maxTableData" name="maxTableData" min="0"/>
                    </fieldset>
                </div>
            </div>
        </div>
    );
}

export default SidebarSetting