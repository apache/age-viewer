import React from 'react'

const NavigatorItem = ({ itemInfo, activeMenuName, onClick }) => {
    const [ menuName, fwCode ] = itemInfo;
    return (
        <li className="nav-item">
            <a id={"side-"+ menuName + "-tab"} className={"nav-link" + (activeMenuName === menuName ? " active show " : "") } data-classname="fixed-left" data-toggle="pill"
                href="/#" role="tab" aria-controls={"side-" + menuName} aria-selected="true" onClick={() => onClick(menuName)}><i
                    className={"fa fa-" + fwCode}></i></a>
        </li>
    );
}

export default NavigatorItem