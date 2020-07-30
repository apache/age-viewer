import { createSlice } from '@reduxjs/toolkit'
import uuid from 'react-uuid'

const FrameSlice = createSlice({
  name: 'frames',
  initialState: [{ frameName: 'ServerConnect', frameProps: { key: uuid(), reqString: ':server connect' } }],
  reducers: {
    addFrame: {
      reducer: (state, action) => {
        const reqString = action.payload.reqString.trim().toLowerCase()

        if (reqString === ':server status') {
          state.unshift({ frameName: 'ServerStatus', frameProps: { key: uuid(), reqString: reqString } })
        } else if (reqString === ':server connect') {
          state.unshift({ frameName: 'ServerConnect', frameProps: { key: uuid(), reqString: reqString } })
        } else if (reqString === ':server disconnect') {
          state.unshift({ frameName: 'ServerDisconnect', frameProps: { key: uuid(), reqString: reqString } })
        } else if (reqString.startsWith('match')) {
          state.unshift({ frameName: 'CypherResultFrame', frameProps: { key: uuid(), reqString: reqString } })
        } else {
          alert("Can't understand your command")
          return;
        }
      },
      prepare: (reqString) => {
        return { payload: { reqString } }
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