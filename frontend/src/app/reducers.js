import { combineReducers } from 'redux'
import DatabaseReducer from '../features/database/DatabaseSlice'
import MetadataReducer from '../features/database/MetadataSlice'
import FrameReducer from '../features/frame/FrameSlice'
import MenuReducer from '../features/menu/MenuSlice'
import SettingReducer from '../features/setting/SettingSlice'
import CypherReducer from '../features/cypher/CypherSlice'
import AlertReducer from '../features/alert/AlertSlice'
import EditorSlice from '../features/editor/EditorSlice'


const rootReducer = combineReducers({
    navigator : MenuReducer,
    setting : SettingReducer,
    database : DatabaseReducer,
    metadata : MetadataReducer,
    frames : FrameReducer,
    cypher: CypherReducer,
    alerts: AlertReducer,
    editor: EditorSlice
})

export default rootReducer