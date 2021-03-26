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

import { connect } from 'react-redux';
import { addFrame, trimFrame } from '../../../features/frame/FrameSlice';
import { addAlert } from '../../../features/alert/AlertSlice';
import { getConnectionStatus } from '../../../features/database/DatabaseSlice';
import { executeCypherQuery } from '../../../features/cypher/CypherSlice';
import { addCommandHistory, addCommandFavorites, setCommand } from '../../../features/editor/EditorSlice';
import { toggleMenu } from '../../../features/menu/MenuSlice';

import Editor from '../presentations/Editor';

const mapStateToProps = (state) => ({
  alertList: state.alerts,
  database: state.database,
  command: state.editor.command,
  isActive: state.navigator.isActive,
});

const mapDispatchToProps = {
  setCommand,
  addFrame,
  trimFrame,
  addAlert,
  getConnectionStatus,
  executeCypherQuery,
  addCommandHistory,
  addCommandFavorites,
  toggleMenu,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
