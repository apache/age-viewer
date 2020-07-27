import { combineReducers } from 'redux'
import DatabaseReducer from '../features/database/DatabaseSlice'
import FrameReducer from '../features/frame/FrameSlice'
import MenuReducer from '../features/menu/MenuSlice'
import SettingReducer from '../features/setting/SettingSlice'


const rootReducer = combineReducers({
    navigator : MenuReducer,
    setting : SettingReducer,
    database : DatabaseReducer,
    frames : FrameReducer
})

export default rootReducer