import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const FrameSlice = createSlice({
  name: 'frames',
  initialState: [],
  reducers: {
    addFrame: {
      reducer: (state, action) => {
        const reqString = action.payload.reqString.current.value.trim().toLowerCase()

        if (reqString === ':server status') {
          state.unshift({frameName : 'ServerStatus', frameProps : {key : uuid(), reqString : reqString}})
        } else if (reqString === ':server connect') {
          state.unshift({frameName : 'ServerConnect', frameProps : {key : uuid(), reqString : reqString}})
        } else if (reqString === ':server disconnect') {
          state.unshift({frameName : 'ServerDisconnect', frameProps : {key : uuid(), reqString : reqString}})
        } else if (reqString.startsWith('match')) {
          state.unshift({frameName : 'CypherResultFrame', frameProps : {key : uuid(), reqString : reqString}})
        } else {
          alert("Can't understand your command")
          return;
        }
      },
      prepare: (reqString) => {
        return { payload: { reqString } }
      }
    }
  }
})

export const { addFrame } = FrameSlice.actions

export default FrameSlice.reducer