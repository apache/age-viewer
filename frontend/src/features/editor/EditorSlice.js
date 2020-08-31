import { createSlice } from '@reduxjs/toolkit'

const EditorSlice = createSlice({
  name: 'editor',
  initialState: {
    reqString : ''
  },
  reducers: {
    setCommand: {
      reducer: (state, action) => {
        return { reqString: action.payload.reqString}
      },
      prepare: (reqString) => {
        return { payload : {reqString}}
      }
    }
  }
})

export const { setCommand } = EditorSlice.actions

export default EditorSlice.reducer