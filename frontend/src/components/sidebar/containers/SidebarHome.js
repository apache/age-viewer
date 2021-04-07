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
import SidebarHome from '../presentations/SidebarHome';
import { setCommand } from '../../../features/editor/EditorSlice';
import { addFrame, trimFrame } from '../../../features/frame/FrameSlice';
import { getMetaData } from '../../../features/database/MetadataSlice';

const mapStateToProps = (state) => ({
  edges: state.metadata.edges,
  nodes: state.metadata.nodes,
  propertyKeys: state.metadata.propertyKeys,
  dbname: state.metadata.dbname,
  graph: state.metadata.graph,
  role: state.metadata.role,
  command: state.editor.command,
});

const mapDispatchToProps = {
  setCommand, addFrame, trimFrame, getMetaData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarHome);
