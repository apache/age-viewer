import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import ServerStatus from '../../components/frame/containers/ServerStatusContainer'
import ServerConnectFrame from '../../components/frame/presentations/ServerConnectFrame'
import ServerDisconnectFrame from '../../components/frame/presentations/ServerDisconnectFrame'
import CypherResultFrame from '../../components/frame/presentations/CypherResultFrame'

const FrameSlice = createSlice({
  name: 'frames',
  initialState: [],
  reducers: {
    addFrame: {
      reducer: (state, action) => {
        const reqString = action.payload.reqString.current.value.trim().toLowerCase()

        if (reqString === ':server status') {
          state.unshift(<ServerStatus />)
        } else if (reqString === ':server connect') {
          state.unshift(<ServerConnectFrame />)
        } else if (reqString === ':server disconnect') {
          state.unshift(<ServerDisconnectFrame />)
        } else if (reqString.startsWith('match')) {
          state.unshift(<CypherResultFrame />)
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