import React, { useEffect, useState } from 'react';
import {
  Button, Input, message, Modal, Select,
} from 'antd';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import uuid from 'react-uuid';

const generateNewFilterObject = () => ({
  key: uuid(),
  keyword: null,
  property: null,
});

const GraphFilterModal = ({
  visible,
  setVisible,
  onSubmit,
  properties,
  globalFilter,
}) => {
  const [propertyElements, setPropertyElements] = useState([]);
  const [filterList, setFilterList] = useState([
    generateNewFilterObject(),
  ]);
  const [filterElements, setFilterElements] = useState(null);

  useEffect(() => {
    if (visible === true) {
      setPropertyElements(null);
    }
    if (visible === true && globalFilter === null) {
      setFilterElements(null);
    }
  }, [visible]);

  const onFilterAdd = (index) => {
    const newFilterList = [...filterList];
    newFilterList.splice(index + 1, 0, generateNewFilterObject());
    setFilterList(newFilterList);
  };

  const onFilterDelete = (index) => {
    const newFilterList = [...filterList];
    newFilterList.splice(index, 1);
    setFilterList(newFilterList);
  };

  const onOk = () => {
    let failed = false;
    const filter = filterList.map((filterItem) => {
      if (filterItem.property === null) {
        failed = true;
        return null;
      }
      return {
        key: filterItem.key,
        keyword: filterItem.keyword,
        property: JSON.parse(filterItem.property),
      };
    });

    if (failed) {
      message.error('cannot leave with empty property.');
      return;
    }

    onSubmit(filter);
    setVisible(false);
  };

  useEffect(() => {
    if (properties !== null) {
      setPropertyElements(
        properties.map((propertyItem) => {
          const strPropertyItem = JSON.stringify(propertyItem);
          return (
            <Select.Option
              key={strPropertyItem}
              value={strPropertyItem}
            >
              &#91;
              {propertyItem.label}
              &#93;&nbsp;
              {propertyItem.property}
            </Select.Option>
          );
        }),
      );
    }
  }, [properties]);

  useEffect(() => {
    const filterListLength = filterList.length;
    setFilterElements(
      filterList.map((filter, index) => (
        <div
          key={filter.key}
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Select
            defaultValue={null}
            onChange={(value) => {
              filterList[index].property = value;
            }}
            style={{ minWidth: 300 }}
          >
            <Select.Option value={null} disabled>Select</Select.Option>
            {propertyElements}
          </Select>
          <div style={{ width: '1px' }} />
          <Input
            style={{ flex: 1 }}
            defaultValue={(globalFilter === null) ? '' : filterList[index].keyword}
            onChange={(event) => {
              filterList[index].keyword = event.target.value;
              setFilterList(filterList);
            }}
          />
          <Button onClick={() => onFilterAdd(index)}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          {filterListLength > 1 ? (
            <Button onClick={() => onFilterDelete(index)}>
              <FontAwesomeIcon icon={faMinus} />
            </Button>
          ) : null}

        </div>
      )),
    );
  }, [propertyElements, filterList]);
  return (
    <Modal title="Filter on Graph" visible={visible} onOk={onOk} onCancel={() => setVisible(false)} width={800}>
      {
        filterElements
      }
    </Modal>
  );
};

GraphFilterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    property: PropTypes.string,
  })).isRequired,
  globalFilter: PropTypes.bool.isRequired,
};

export default GraphFilterModal;
