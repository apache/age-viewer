import { combineReducers } from 'redux'
import DatabaseReducer from '../features/database/DatabaseSlice'
import FrameReducer from '../features/frame/FrameSlice'
import MenuReducer from '../features/menu/MenuSlice'
import SettingReducer from '../features/setting/SettingSlice'
import CypherReducer from '../features/cypher/CypherSlice'
import AlertReducer from '../features/alert/AlertSlice'


const rootReducer = combineReducers({
    navigator : MenuReducer,
    setting : SettingReducer,
    database : DatabaseReducer,
    frames : FrameReducer,
    cypher: CypherReducer,
    alerts: AlertReducer
})

export default rootReducer