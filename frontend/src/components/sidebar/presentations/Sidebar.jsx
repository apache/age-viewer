import React from 'react'
import SidebarHome from '../containers/SidebarHome'
import SidebarSetting from '../containers/SidebarSetting'
import SidebarAbout from '../containers/SidebarAbout'

const Sidebar = ({ activeMenuName, isActive }) => {
    return (
        <div id="sidebar" className={isActive ? " active " : ""} style={{overflowY: 'scroll'}}>
            <div className="tab-content">
                <div className={"tab-pane fade" + (activeMenuName === "home" ? " active show " : "") } role="tabpanel" aria-labelledby="side-home-tab">
                    <SidebarHome />
                </div>
                <div className={"tab-pane fade" + (activeMenuName === "setting" ? " active show " : "") } role="tabpanel" aria-labelledby="side-setting-tab">
                    <SidebarSetting />
                </div>
                <div className={"tab-pane fade" + (activeMenuName === "about" ? " active show " : "") } role="tabpanel" aria-labelledby="side-about-tab">
                    <SidebarAbout />
                </div>
            </div>
        </div>
    );
}

export default Sidebar