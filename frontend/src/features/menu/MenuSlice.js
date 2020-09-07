import { createSlice } from '@reduxjs/toolkit'

const MenuSlice = createSlice({
  name: 'navigator',
  initialState: {
    menuList: [['home', 'home'], ['setting', 'cog'], ['about', 'info-circle']],
    activeMenu: 'init',
    isActive: false
  },
  reducers: {
    toggleMenu: {
      reducer: (state, action) => {
        let isActive = true
        if (state.activeMenu === action.payload.selectedMenuName) {
          action.payload.selectedMenuName = ''
          isActive = false
        }
        state.activeMenu = action.payload.selectedMenuName
        state.isActive = isActive
      },
      prepare: (selectedMenuName) => {
        return { payload : {selectedMenuName}}
      }
    }
  }
})

export const { toggleMenu } = MenuSlice.actions

export default MenuSlice.reducer