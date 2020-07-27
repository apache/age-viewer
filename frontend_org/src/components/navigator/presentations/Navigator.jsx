import React from 'react'
import NavigatorItem from './NavigatorItem'

const Navigator = ({ menuList, activeMenuName, toggleMenu }) => {
    const menus = menuList.map((menuItem, index) => (
        <NavigatorItem itemInfo={menuItem} activeMenuName={activeMenuName} onClick={toggleMenu} key={index}/>
    ));
    return (
        <nav id="navbar" className="navbar navbar-expand-md fixed-left">
            <div className="collapse navbar-collapse " id="navbarsExampleDefault">
                <ul className="navbar-nav nav flex-column">
                    {menus}
                </ul>
            </div>
        </nav>
    );
}

export default Navigator