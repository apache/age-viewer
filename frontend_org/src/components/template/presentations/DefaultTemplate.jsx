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