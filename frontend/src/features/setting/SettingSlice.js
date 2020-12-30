/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createSlice } from '@reduxjs/toolkit'

const SidebarSettingSlice = createSlice({
  name: 'setting',
  initialState: {
    theme: 'default'
  },
  reducers: {
    changeTheme: {
      reducer: (state, action) => {
        state.theme = action.payload.theme
      },
      prepare: (event) => {
        return { payload : {theme : event.target.value}}
      }
    }
  }
})

export const { changeTheme } = SidebarSettingSlice.actions

export default SidebarSettingSlice.reducer