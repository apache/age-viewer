import { createSlice } from '@reduxjs/toolkit'
import { about, setting } from '../../conf/config'
import { saveToCookie } from '../cookie/CookieUtil'

const SidebarSettingSlice = createSlice({
  name: 'setting',
  initialState: {
    theme: setting.theme,
    maxNumOfFrames: setting.maxNumOfFrames,
    maxNumOfHistories: setting.maxNumOfHistories,
    maxDataOfGraph: setting.maxDataOfGraph,
    maxDataOfTable: setting.maxDataOfTable,
    releaseDate: about.releaseDate,
    version: about.version,
    license: about.license
  },
  reducers: {
    resetSetting: () => {
      saveToCookie('theme', setting.theme)
      saveToCookie('maxNumOfFrames', setting.maxNumOfFrames)
      saveToCookie('maxNumOfHistories', setting.maxNumOfHistories)
      saveToCookie('maxDataOfGraph', setting.maxDataOfGraph)
      saveToCookie('maxDataOfTable', setting.maxDataOfTable)
      saveToCookie('releaseDate', about.releaseDate)
      saveToCookie('version', about.version)
      saveToCookie('license', about.license)

      return {
        theme: setting.theme,
        maxNumOfFrames: setting.maxNumOfFrames,
        maxNumOfHistories: setting.maxNumOfHistories,
        maxDataOfGraph: setting.maxDataOfGraph,
        maxDataOfTable: setting.maxDataOfTable,
        releaseDate: about.releaseDate,
        version: about.version,
        license: about.license
        }
      },
    changeTheme: {
      reducer: (state, action) => {
        state.theme = action.payload.theme
      },
      prepare: (event) => {
        return { payload : {theme : event.target.value}}
      }
    },
    changeMaxNumOfFrames: {
      reducer: (state, action) => {
        state.maxNumOfFrames = action.payload.maxNumOfFrames
      },
      prepare: (event) => {
        return { payload : {maxNumOfFrames : event.target.value}}
      }
    },
    changeMaxNumOfHistories: {
      reducer: (state, action) => {
        state.maxNumOfHistories = action.payload.maxNumOfHistories
      },
      prepare: (event) => {
        return { payload : {maxNumOfHistories : event.target.value}}
      }
    },
    changeMaxDataOfGraph: {
      reducer: (state, action) => {
        state.maxDataOfGraph = action.payload.maxDataOfGraph
      },
      prepare: (event) => {
        return { payload : {maxDataOfGraph : event.target.value}}
      }
    },
    changeMaxDataOfTable: {
      reducer: (state, action) => {
        state.maxDataOfTable = action.payload.maxDataOfTable
      },
      prepare: (event) => {
        return { payload : {maxDataOfTable : event.target.value}}
      }
    },
    changeSettings: {
      reducer: (state, action) => {
        state.theme = action.payload.theme
        state.maxNumOfFrames = action.payload.maxNumOfFrames
        state.maxNumOfHistories = action.payload.maxNumOfHistories
        state.maxDataOfGraph = action.payload.maxDataOfGraph
        state.maxDataOfTable = action.payload.maxDataOfTable
      },
      prepare: (settings) => {
        return { payload : {
          theme : settings.theme,
          maxNumOfFrames: settings.maxNumOfFrames,
          maxNumOfHistories: settings.maxNumOfHistories,
          maxDataOfGraph: settings.maxDataOfGraph,
          maxDataOfTable: settings.maxDataOfTable
        }}
      }
    }
  }
})

export const { changeTheme, changeMaxNumOfFrames, changeMaxNumOfHistories, changeMaxDataOfGraph, changeMaxDataOfTable, changeSettings, resetSetting } = SidebarSettingSlice.actions

export default SidebarSettingSlice.reducer