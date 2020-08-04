import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const FrameSlice = createSlice({
  name: 'frames',
  initialState: [],
  reducers: {
    addFrame: {
      reducer: (state, action) => {
        const reqString = action.payload.reqString.trim().toLowerCase()
        let refKey = action.payload.refKey ? action.payload.refKey : uuid()
        if (reqString === ':server status') {
          state.unshift({ frameName: 'ServerStatus', frameProps: { key: refKey, reqString: reqString } })
        } else if (reqString === ':server connect') {
          state.unshift({ frameName: 'ServerConnect', frameProps: { key: refKey, reqString: reqString } })
        } else if (reqString === ':server disconnect') {
          state.unshift({ frameName: 'ServerDisconnect', frameProps: { key: refKey, reqString: reqString } })
        } else if (reqString.startsWith('match')) {
          state.unshift({ frameName: 'CypherResultFrame', frameProps: { key: refKey, reqString: reqString } })
        } else {
          alert("Can't understand your command")
          return;
        }
      },
      prepare: (reqString, refKey) => {
        return { payload: { reqString, refKey } }
      }
    },
    removeFrame: {
      reducer: (state, action) => {
        const frameKey = action.payload.refKey
        state.splice(state.findIndex((frame) => (frame.frameProps.key === frameKey)), 1)        
      },
      prepare: (refKey) => {
        return { payload: { refKey } }
      }

    }
  }
})

export const { addFrame, removeFrame } = FrameSlice.actions

export default FrameSlice.reducer