import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer
});

export default store

/*
import {createStore} from 'redux';

function reducer(state, action) {

    if (state === undefined) {
        return {
            setting: {
                theme: 'default'
            },
            database: {
                host: '127.0.0.1',
                port: 5432,
                userName: 'agens',
                databaseName: 'northwind',
                graphPath: 'northwind_graph'
            },
            navigator: {
                menuList: [['home', 'home'], ['setting', 'cog']],
                activeMenu: ''
            },
            frames: []
        }
    }

    if (action.type === 'TOGGLE_MENU') {
        let n = {...state.navigator}
        n.activeMenu = action.activeMenu
        return {...state, navigator: n}
    } else if (action.type === 'CHANGE_THEME') {
        let s = {...state.setting}
        s.theme = action.theme
        return {...state, setting: s}
    } else if (action.type === 'ADD_FRAME') {
        return {...state, frames: action.frames}
    }

    return state;

}

export default createStore(
    reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
*/