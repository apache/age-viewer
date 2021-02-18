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

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown, faAngleUp, faPaperclip, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

const ServerDisconnectFrame = ({
  refKey,
  isPinned,
  reqString,
  disconnectToAgensGraph,
  addFrame,
  removeFrame,
  pinFrame,
  addAlert,
  setCommand,
  resetMetaData,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(() => disconnectToAgensGraph().then((response) => {
      if (response.type === 'database/disconnectToAgensGraph/fulfilled') {
        resetMetaData();
      }
    }));
    /* dispatch(() => addFrame(':server connect')); */
    /* dispatch(() => addAlert('NoticeServerDisconnected')); */
  }, [dispatch, disconnectToAgensGraph, addFrame, addAlert]);

  const setIconForIsExpanded = () => (
    <FontAwesomeIcon
      icon={isExpanded ? faAngleUp : faAngleDown}
      size="lg"
    />
  );

  return (
    <div className="card mt-3">
      <div className="card-header">
        <div className="d-flex card-title text-muted">
          <div className="mr-auto">
            <strong>
              {' '}
              $
              {reqString}
            </strong>
          </div>
          <button
            type="button"
            className={`frame-head-button btn btn-link px-3${isPinned ? ' selected ' : ''}`}
            onClick={() => pinFrame(refKey)}
          >
            <FontAwesomeIcon
              icon={faPaperclip}
              size="lg"
            />
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link px-3"
            data-toggle="collapse"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded(!isExpanded)}
            aria-controls={refKey}
          >
            {setIconForIsExpanded(isExpanded)}
          </button>
          <button
            type="button"
            className="frame-head-button btn btn-link pl-3"
            onClick={() => removeFrame(refKey)}
          >
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
            />
          </button>
        </div>
      </div>
      <Collapse in={isExpanded}>
        <div className="card-body collapse" id={refKey}>
          <div className="row">
            <div className="col-3">
              <h3>Disconnected Succesfully</h3>
              <p>You are successfully disconnected from Agensgraph.</p>
            </div>
            <div className="col-9">
              <p>
                You may run
                <a href="/#" className="badge badge-light" onClick={() => { setCommand(':server connect'); }}>
                  <FontAwesomeIcon
                    icon={faPlayCircle}
                    size="lg"
                  />
                  :server connection
                </a>
                {' '}
                to establish new connection
              </p>
            </div>
          </div>
        </div>
      </Collapse>
      <div className="card-footer" />
    </div>
  );
};

ServerDisconnectFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  disconnectToAgensGraph: PropTypes.func.isRequired,
  addFrame: PropTypes.func.isRequired,
  removeFrame: PropTypes.func.isRequired,
  pinFrame: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
  setCommand: PropTypes.func.isRequired,
  resetMetaData: PropTypes.func.isRequired,
};

export default ServerDisconnectFrame;
