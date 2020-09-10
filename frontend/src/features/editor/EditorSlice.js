import { createSlice } from '@reduxjs/toolkit'

const EditorSlice = createSlice({
  name: 'editor',
  initialState: {
    reqString : '',
    commandHistroy : []
  },
  reducers: {
    setCommand: {
      reducer: (state, action) => {
        state.reqString =  action.payload.reqString
      },
      prepare: (reqString) => {
        return { payload : {reqString}}
      }
    },
    addCommandHistory: {
      reducer: (state, action) => {
        state.commandHistroy.push(action.payload.command)
      },
      prepare: (command) => {
        return { payload : {command}}
      }
    }
  }
})

export const { setCommand, addCommandHistory } = EditorSlice.actions

export default EditorSlice.reducer