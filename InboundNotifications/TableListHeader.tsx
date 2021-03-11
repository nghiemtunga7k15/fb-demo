import React from 'react'
import {
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  FilterOutlined,
  DeleteFilled
} from '@ant-design/icons'
import { Button, Input, Radio, Popover, DatePicker } from 'antd'

import cx from 'classnames'

import { useDeviceContext } from './DeviceListContext'
import FilterForm from './FilterForm'


function TableListHeader() {
  const {
    search,
    loading,
    currentPage,
    totalPage,
    selectedIds,
    dispatch
  } = useDeviceContext()

  const handleSearchChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const value = (event.target as HTMLInputElement).value
      if (value !== search) {
        dispatch({
          type: 'SET_SEARCH',
          payload: value
        })
      }
    }
  }

  const handlePageChange = (page: number) => () => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: currentPage + page
    })
  }

  const handleDeselectAll = () => {
    dispatch({
      type: 'SET_SELECTED_ID',
      payload: []
    })
  }

  return (
    <div className={cx('table-header', { loading })}>
      <div className="header-left">
        <Input
          placeholder="Search device by name"
          suffix={<SearchOutlined />}
          onKeyDown={handleSearchChange}
        />
      </div>
      <div className={cx('header-right', { hide: selectedIds.length })}>
        <Radio.Group value="">
          <Radio.Button
            disabled={currentPage === 1}
            onClick={handlePageChange(-1)}
          >
            <LeftOutlined />
          </Radio.Button>
          <Radio.Button>Page: {currentPage}</Radio.Button>
          <Radio.Button
            disabled={currentPage === totalPage}
            onClick={handlePageChange(1)}
          >
            <RightOutlined />
          </Radio.Button>
        </Radio.Group>
        <DatePicker picker="week" placeholder="Duration: All time" className="time" />
        <Popover
          title="Quick Filter"
          trigger="click"
          overlayClassName="quick-filter-wrapper"
          placement="bottomRight"
          content={() => <FilterForm />}
          destroyTooltipOnHide
        >
          <Button className="ant-btn-secondary">
            <FilterOutlined />
            Filter
          </Button>
        </Popover>
      </div>
      <div className={cx('header-right', { hide: !selectedIds.length })}>
        <Button className="ant-btn-secondary" onClick={handleDeselectAll}>
          Deselect All
        </Button>
        <Button className="ant-btn-secondary">
          <DeleteFilled />
          Delete {selectedIds.length} selected
        </Button>
      </div>
      
    </div>
  )
}

export default TableListHeader
