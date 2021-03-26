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

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

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
