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

        const fistNotPinnedIndex = state.findIndex((frame) => (frame.isPinned === false))
        let frameName = ''
        if (reqString === ':server status') {
          frameName = 'ServerStatus'
        } else if (reqString === ':server connect') {
          frameName = 'ServerConnect'
        } else if (reqString === ':server disconnect') {
          frameName = 'ServerDisconnect'
        } else if (reqString.match("(match|create).*")) {
          frameName = 'CypherResultFrame'
        } else {
          alert("Can't understand your command")
          return;
        }
        state.splice(fistNotPinnedIndex, 0, { frameName: frameName, frameProps: { key: refKey, reqString: reqString }, isPinned : false })
        state.map((frame) => {if (frame['orgIndex']) {frame['orgIndex'] = frame['orgIndex'] + 1}; return frame})
      },
      prepare: (reqString, refKey) => {
        return { payload: { reqString, refKey } }
      }
    },
    removeFrame: {
      reducer: (state, action) => {
        const frameKey = action.payload.refKey
        state.splice(state.findIndex((frame) => (frame.frameProps.key === frameKey)), 1)
        state.map((frame) => {if (frame['orgIndex']) {frame['orgIndex'] = frame['orgIndex'] - 1}; return frame})
      },
      prepare: (refKey) => {
        return { payload: { refKey } }
      }

    },
    pinFrame: {
      reducer: (state, action) => {
        const frameKey = action.payload.refKey
        const frameIndex = state.findIndex((frame) => (frame.frameProps.key === frameKey))
        if (!state[frameIndex]['isPinned']) {
          state[frameIndex]['isPinned'] = true
          state[frameIndex]['orgIndex'] = frameIndex
          state.splice(0, 0, state.splice(frameIndex, 1)[0]);
        } else {
          state[frameIndex]['isPinned'] = false
          let indexMoveTo = state[frameIndex]['orgIndex']
          state.splice(indexMoveTo, 0, state.splice(frameIndex, 1)[0]);
        }
      },
      prepare: (refKey) => {
        return { payload: { refKey } }
      }
    }
  }
})

export const { addFrame, removeFrame, pinFrame } = FrameSlice.actions

export default FrameSlice.reducer