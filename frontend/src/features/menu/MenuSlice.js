import { createSlice } from '@reduxjs/toolkit'

const MenuSlice = createSlice({
  name: 'navigator',
  initialState: {
    menuList: [['home', 'home'], ['setting', 'cog']],
    activeMenu: ''
  },
  reducers: {
    toggleMenu: {
      reducer: (state, action) => {
        if (state.activeMenu === action.payload.selectedMenuName) {
          action.payload.selectedMenuName = ''
        }
        state.activeMenu = action.payload.selectedMenuName
      },
      prepare: (activeMenuName, selectedMenuName) => {
        return { payload : {activeMenuName, selectedMenuName}}
      }
    }
  }
})

export const { toggleMenu } = MenuSlice.actions

export default MenuSlice.reducer