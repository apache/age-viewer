import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const AlertSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    addAlert: {
      reducer: (state, action) => {
        let alertType = action.payload.alertType 
        if (alertType === 'NoticeServerDisconnected') {
          state.push({alertType : 'NoticeServerDisconnected', alerProps : {key : uuid(), alertType : 'notice'}})
        } else if (alertType === 'NoticeServerConnected') {
          state.push({alertType : 'NoticeServerConnected', alerProps : {key : uuid(), alertType : 'notice'}})
        } else if (alertType === 'ErrorNoDatabaseConnected') {
          state.push({alertType : 'ErrorNoDatabaseConnected', alerProps : {key : uuid(), alertType : 'Error'}})
        } else {
          alert("Can't find proper alert name")
          return;
        }
      },
      prepare: (alertType) => {
        return { payload: { alertType } }
      }
    }
  }
})

export const { addAlert } = AlertSlice.actions

export default AlertSlice.reducer