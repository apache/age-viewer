import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faAngleUp,
  faCompressAlt,
  faDownload,
  faExpandAlt,
  // faPaperclip,
  faSync, faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { Button, Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import styles from './Frame.module.scss';

const Frame = ({
  reqString, content,
  // isPinned, pinFrame,
  refKey, removeFrame,
  onSearch, onSearchCancel, onDownload, onRefresh,
  bodyNoPadding,
}) => {
  const [isFullScreen, setFullScreen] = useState(false);
  const [isExpand, setExpand] = useState(true);

  const downloadMenu = () => (
    <Menu onClick={(e) => onDownload(e)}>
      <Menu.Item key="png">
        Save as PNG
      </Menu.Item>
      <Menu.Item key="json">
        Save as JSON
      </Menu.Item>
      <Menu.Item key="csv">
        Save as CSV
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={`${styles.Frame} ${isFullScreen ? styles.FullScreen : ''}`}>
      <div className={styles.FrameHeader}>
        <div className={styles.FrameHeaderText}>
          {'$ '}
          <strong>
            {reqString}
          </strong>
        </div>
        <div className={styles.ButtonArea}>
          {onSearchCancel ? (
            <Button
              size="large"
              type="link"
              className={styles.FrameButton}
              onClick={() => onSearchCancel()}
              title="Filter/Search"
            >
              <i className="icon-search-cancel" />
            </Button>
          ) : null}
          {onSearch ? (
            <Button
              size="large"
              type="link"
              className={styles.FrameButton}
              onClick={() => onSearch()}
              title="Cancel Search"
            >
              <i className="icon-filter" />
            </Button>
          ) : null}
          {false ? ( // en:Functionality is hidden due to functional problems // ko:기능이 동작하지 않아 감춤
            <Dropdown
              trigger={['click']}
              overlay={downloadMenu}
            >
              <Button
                size="large"
                type="link"
                className={styles.FrameButton}
              >
                <FontAwesomeIcon
                  icon={faDownload}
                  size="lg"
                />
                <FontAwesomeIcon icon={faAngleDown} />
              </Button>
            </Dropdown>
          )
            : null}
          <Button
            size="large"
            type="link"
            className={`${styles.FrameButton} ${isFullScreen ? styles.activate : ''}`}
            onClick={() => setFullScreen(!isFullScreen)}
            title="Expand"
          >
            <FontAwesomeIcon
              icon={isFullScreen ? faCompressAlt : faExpandAlt}
              size="lg"
            />
          </Button>
          {
            onRefresh ? (
              <Button
                size="large"
                type="link"
                className={`${styles.FrameButton}`}
                onClick={() => onRefresh()}
                title="Refresh"
              >
                <FontAwesomeIcon
                  icon={faSync}
                  size="lg"
                />
              </Button>
            ) : null
          }

          {/* <Button
            size="large"
            type="link"
            className={`${styles.FrameButton} ${isPinned ? styles.activate : ''}`}
            onClick={() => pinFrame(refKey)}
          >
            <FontAwesomeIcon
              icon={faPaperclip}
              size="lg"
            />
          </Button> */}
          <Button
            size="large"
            type="link"
            className={`${styles.FrameButton}`}
            onClick={() => setExpand(!isExpand)}
            title={isExpand ? 'Hide' : 'Show'}
          >
            <FontAwesomeIcon
              icon={isExpand ? faAngleUp : faAngleDown}
              size="lg"
            />
          </Button>
          <Button
            size="large"
            type="link"
            className={`${styles.FrameButton}`}
            onClick={() => removeFrame(refKey)}
            title="Close Window"
          >
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
            />
          </Button>
        </div>
      </div>
      <div className={`${styles.FrameBody} ${isExpand ? '' : styles.Contract} ${bodyNoPadding ? styles.NoPadding : ''}`}>
        {content}
      </div>
    </div>
  );
};

Frame.defaultProps = {
  onSearch: null,
  onSearchCancel: null,
  onDownload: null,
  onRefresh: null,
  bodyNoPadding: false,
};

Frame.propTypes = {
  reqString: PropTypes.string.isRequired,
  content: PropTypes.element.isRequired,
  // isPinned: PropTypes.bool.isRequired,
  // pinFrame: PropTypes.func.isRequired,
  refKey: PropTypes.string.isRequired,
  removeFrame: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  onSearchCancel: PropTypes.func,
  onDownload: PropTypes.func,
  onRefresh: PropTypes.func,
  bodyNoPadding: PropTypes.bool,
};

export default Frame;
