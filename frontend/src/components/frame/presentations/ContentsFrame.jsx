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

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Carousel, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown, faAngleLeft, faAngleRight, faAngleUp, faPaperclip, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { slides as northwindSlides } from '../../../documents/tutorial/northwind';

const ContentFrame = ({
  refKey, isPinned, reqString, playTarget, removeFrame, pinFrame, addAlert,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    if (playTarget.toLowerCase() === 'northwind') {
      setSlides(northwindSlides);
    } else {
      addAlert('ErrorPlayLoadFail', playTarget);
      removeFrame(refKey);
    }
  }, []);

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
            {setIconForIsExpanded()}
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

        <div className="card-body" id={refKey} style={{ padding: 'initial' }}>
          <Carousel
            interval={null}
            fade
            wrap={false}
            prevIcon={(
              <FontAwesomeIcon
                icon={faAngleLeft}
                size="lg"
              />
              )}
            nextIcon={(
              <FontAwesomeIcon
                icon={faAngleRight}
                size="lg"
              />
            )}
          >
            {slides.map((slide) => (
              <Carousel.Item>
                <div style={{ paddingTop: '10px' }}>
                  {slide}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

      </Collapse>
      <div className="card-footer" />
    </div>
  );
};

ContentFrame.propTypes = {
  refKey: PropTypes.string.isRequired,
  isPinned: PropTypes.bool.isRequired,
  reqString: PropTypes.string.isRequired,
  playTarget: PropTypes.string.isRequired,
  removeFrame: PropTypes.func.isRequired,
  pinFrame: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
};

export default ContentFrame;
