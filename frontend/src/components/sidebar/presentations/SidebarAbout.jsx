/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ColoredLine, SubLabelLeft, SubLabelRight } from './SidebarComponents';

const SidebarAbout = ({ releaseDate, version, license }) => (
  <div className="sidebar-setting">
    <div className="sidebar sidebar-header">
      <h4>About AGViewer</h4>
    </div>
    <div className="sidebar sidebar-body">
      <div className="form-group">
        <b>Made by Bitnine</b>
        <ColoredLine />
        <SubLabelLeft
          label={(
            <span>
              Visit us at
              <a target="_blank" rel="noopener noreferrer" href="http://bitnine.net"> Bitnine!</a>
            </span>
)}
          classes="py-1"
        />
      </div>
      <div className="form-group pt-4">
        <b>Current AGViewer Version</b>
        <ColoredLine />
        <div>
          <h6>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SubLabelRight label="AGViewer :" classes="col-sm-6" />
              <SubLabelLeft label={version} classes="col-sm-6" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SubLabelRight label="Released at :" classes="col-sm-6" />
              <SubLabelLeft label={releaseDate} classes="col-sm-6" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <SubLabelRight label="License :" classes="col-sm-6" />
              <SubLabelLeft label={license} classes="col-sm-6" />
            </div>
          </h6>
        </div>
      </div>
      <div className="form-group pt-4">
        <b>You Have Feedback for us?</b>
        <ColoredLine />
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <SubLabelLeft
            label={(
              <span>
                Leave your feedback at
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/bitnine-oss/AGViewer/issues"> Here!</a>
                {' '}
                <br />
                Your feedback help us provide you better experience!
              </span>
)}
            classes="py-1"
          />
        </div>
      </div>

    </div>
  </div>
);

SidebarAbout.propTypes = {
  releaseDate: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  license: PropTypes.string.isRequired,
};

export default SidebarAbout;
