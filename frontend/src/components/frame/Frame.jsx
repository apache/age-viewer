import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown, faAngleUp, faCompressAlt, faExpandAlt, faSync, faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Button, Popover } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import styles from './Frame.module.scss';
import { removeFrame } from '../../features/frame/FrameSlice';

const Frame = ({
  reqString, children, refKey,
  onSearch, onSearchCancel, onRefresh,
  onThick, thicnessMenu,
  bodyNoPadding,
}) => {
  const dispatch = useDispatch();
  const [isFullScreen, setFullScreen] = useState(false);
  const [isExpand, setExpand] = useState(true);

  // const downloadMenu = () => (
  //   <Menu onClick={(e) => onDownload(e)}>
  //     <Menu.Item key="png">
  //       Save as PNG
  //     </Menu.Item>
  //     <Menu.Item key="json">
  //       Save as JSON
  //     </Menu.Item>
  //     <Menu.Item key="csv">
  //       Save as CSV
  //     </Menu.Item>
  //   </Menu>
  // );

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
          {onThick ? (
            <Popover placement="bottomLeft" content={thicnessMenu} trigger="click">
              <Button
                size="large"
                type="link"
                className={styles.FrameButton}
                title="Edge Weight"
                onClick={() => onThick()}
              >
                <i className="icon-edge-weight" />
              </Button>
            </Popover>
          ) : null }
          {onSearchCancel ? (
            <Button
              size="large"
              type="link"
              className={styles.FrameButton}
              onClick={() => onSearchCancel()}
              title="Cancel Search"
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
              title="Filter/Search"
            >
              <i className="icon-filter" />
            </Button>
          ) : null}
          {/* {false ? ( // en:Functionality is hidden due to */}
          {/* functional problems // ko:기능이 동작하지 않아 감춤 */}
          {/*  <Dropdown */}
          {/*    trigger={['click']} */}
          {/*    overlay={downloadMenu} */}
          {/*  > */}
          {/*    <Button */}
          {/*      size="large" */}
          {/*      type="link" */}
          {/*      className={styles.FrameButton} */}
          {/*    > */}
          {/*      <FontAwesomeIcon */}
          {/*        icon={faDownload} */}
          {/*        size="lg" */}
          {/*      /> */}
          {/*      <FontAwesomeIcon icon={faAngleDown} /> */}
          {/*    </Button> */}
          {/*  </Dropdown> */}
          {/* ) */}
          {/*  : null} */}
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
            onClick={() => dispatch(removeFrame(refKey))}
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
        {children}
      </div>
    </div>
  );
};

Frame.defaultProps = {
  onSearch: null,
  onThick: null,
  onSearchCancel: null,
  thicnessMenu: null,
  onRefresh: null,
  bodyNoPadding: false,
};

Frame.propTypes = {
  reqString: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  refKey: PropTypes.string.isRequired,
  onSearch: PropTypes.func,
  onThick: PropTypes.func,
  thicnessMenu: PropTypes.func,
  onSearchCancel: PropTypes.func,
  onRefresh: PropTypes.func,
  bodyNoPadding: PropTypes.bool,
};

export default Frame;
