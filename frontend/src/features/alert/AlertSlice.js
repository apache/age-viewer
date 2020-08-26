import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const AlertSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    addAlert: {
      reducer: (state, action) => {
        let alertName = action.payload.alertName 
        let alertType = 'Notice'
        let errorMessage = ''

        if (['ErrorServerConnectFail', 'ErrorNoDatabaseConnected'].includes(alertName)) {
          alertType = 'Error'
          errorMessage = action.payload.message 
        }

        state.push({alertName : alertName, alertProps : {key : uuid(), alertType : alertType, errorMessage : errorMessage}})
      },
      prepare: (alertName, message) => {
        console.log("alertName, message" , alertName, message)
        return { payload: { alertName, message } }
      }
    }
  }
})

export const { addAlert } = AlertSlice.actions

export default AlertSlice.reducer