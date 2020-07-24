import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import ServerStatus from '../../components/frame/containers/ServerStatusContainer'
import ServerConnect from '../../components/frame/containers/ServerConnectContainer'
import ServerDisconnect from '../../components/frame/containers/ServerDisconnectContainer'
import CypherResultFrame from '../../components/frame/presentations/CypherResultFrame'
import uuid from 'react-uuid'

const FrameSlice = createSlice({
  name: 'frames',
  initialState: [],
  reducers: {
    addFrame: {
      reducer: (state, action) => {
        const reqString = action.payload.reqString.current.value.trim().toLowerCase()

        if (reqString === ':server status') {
          state.unshift(<ServerStatus key={uuid()}/>)
        } else if (reqString === ':server connect') {
          state.unshift(<ServerConnect key={uuid()} />)
        } else if (reqString === ':server disconnect') {
          state.unshift(<ServerDisconnect key={uuid()} />)
        } else if (reqString.startsWith('match')) {
          state.unshift(<CypherResultFrame key={uuid()} />)
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