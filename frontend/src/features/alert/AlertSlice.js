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

import { createSlice } from '@reduxjs/toolkit';
import uuid from 'react-uuid';

const AlertSlice = createSlice({
  name: 'alerts',
  initialState: [],
  reducers: {
    addAlert: {
      reducer: (state, action) => {
        const { alertName } = action.payload;
        let alertType = 'Notice';
        let errorMessage = '';

        if (['ErrorServerConnectFail', 'ErrorNoDatabaseConnected', 'ErrorPlayLoadFail'].includes(alertName)) {
          alertType = 'Error';
          errorMessage = action.payload.message;
        }

        state.push({ alertName, alertProps: { key: uuid(), alertType, errorMessage } });
      },
      prepare: (alertName, message) => ({ payload: { alertName, message } }),
    },
    removeAlert: {
      reducer: (state, action) => {
        const { alertKey } = action.payload;
        return state.filter((alert) => (alert.alertProps.key !== alertKey));
      },
      prepare: (alertKey) => ({ payload: { alertKey } }),
    },
  },
});

export const { addAlert, removeAlert } = AlertSlice.actions;

export default AlertSlice.reducer;
