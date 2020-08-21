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

        if (['ErrorServerConnectFail', 'ErrorNoDatabaseConnected'].includes(alertType)) {
          alertType = 'Error'
        }

        state.push({alertName : alertName, alerProps : {key : uuid(), alertType : alertType}})
      },
      prepare: (alertName) => {
        return { payload: { alertName } }
      }
    }
  }
})

export const { addAlert } = AlertSlice.actions

export default AlertSlice.reducer