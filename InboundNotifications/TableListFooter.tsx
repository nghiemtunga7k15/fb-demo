import { Pagination, Select } from 'antd'
import cx from 'classnames'

import { useDeviceContext } from './DeviceListContext'

function TableListFooter() {
  const {
    totalItem,
    pageSize,
    currentPage,
    loading,
    dispatch
  } = useDeviceContext()

  const handlePageSizeChange = (value: string) => {
    dispatch({
      type: 'SET_PAGE_SIZE',
      payload: +value
    })
  }

  const handlePageChange = (page: number) => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      payload: page
    })
  }

  return (
    <div className={cx('table-footer', { loading })}>
      <div className="table-size-changer">
        Show{' '}
        <Select value={pageSize} onChange={handlePageSizeChange}>
          <Select.Option value="10">10</Select.Option>
          <Select.Option value="20">20</Select.Option>
          <Select.Option value="50">50</Select.Option>
        </Select>{' '}
        of {totalItem} results
      </div>
      <Pagination
        current={currentPage}
        total={totalItem}
        pageSize={pageSize}
        showQuickJumper
        showSizeChanger={false}
        onChange={handlePageChange}
        hideOnSinglePage
      />
    </div>
  )
}

export default TableListFooter
