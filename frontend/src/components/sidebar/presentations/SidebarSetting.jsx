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