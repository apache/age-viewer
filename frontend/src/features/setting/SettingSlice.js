import { createSlice } from '@reduxjs/toolkit'

const SidebarSettingSlice = createSlice({
  name: 'setting',
  initialState: {
    theme: 'default'
  },
  reducers: {
    changeTheme: {
      reducer: (state, action) => {
        state.theme = action.payload.theme
      },
      prepare: (event) => {
        return { payload : {theme : event.target.value}}
      }
    }
  }
})

export const { changeTheme } = SidebarSettingSlice.actions

export default SidebarSettingSlice.reducer