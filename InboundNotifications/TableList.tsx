import React, { useEffect, useRef, useState } from 'react'

import { Table, Button } from 'antd'

import Edit from 'assets/icons/edit.svg'
import Delete from 'assets/icons/delete.svg'
import Ellipse from 'assets/icons/Ellipse 9.svg'
import Coppy from 'assets/icons/Coppy.svg'
import View from 'assets/icons/View.svg'
import Note from 'assets/icons/Note.svg'

import { Device, getDevices } from 'services/devices'
import { useDeviceContext } from './DeviceListContext'
import PopoverConfirm from 'components/PopoverConfirm'
import TableListHeader from './TableListHeader'
import TableListFooter from './TableListFooter'

const LIVE_UPDATE_INTERVAL = 15 * 60 * 1000


const renderDeviceName = () => {
  return (
    <div className="location-cell">
      <p>Jan 24, 2021 01:04:32 EST</p>
    </div>
  )
}

const renderNotification = (devices: any) => {
  if(devices.id %2 === 0  ){
    return (
      <div className="location-cell">
        <p>{devices.name}</p>
        <img src={Ellipse} alt="play"  style={{ marginLeft: 9 , marginTop: 1  }}/>
        <img src={Coppy} alt="play"  style={{  marginTop: 1 }}/>
      </div>
    )
  }else{
    return (
      <div className="location-cell">
        <p>devices.name</p>
        <img src={Ellipse} alt="play"  style={{ marginLeft: 9 , marginTop: 1  }}/>      
      </div>
    )
  }
}

const renderRecipent = (devices: any) => {
  if(devices.id %2 === 0  ){
    return (
      <div className="location-cell">
      <p>20/20</p>
    </div>
    )
  }else{
    return (
      <div className="location-cell-full">
      <p>20/20</p>
    </div>
    )
  }
}


const renderTag = (devices: any) => {

  if (devices.id === 27 ){
    return (
      <div className="tag-cell">
        <Button className="ant-btn-no-tag">
          No tags
        </Button>
        <Button className="ant-btn-view">
          <img src={View} alt="play"  />  
          <span className="text">Preview Notification</span>
        </Button>
        <Button className="ant-btn-note">
          <img src={Note} alt="play"  />  
          <span className="text">Add Note</span>
        </Button>
      </div>
    )
  }
  return (
    <div className="tag-cell">
      <Button className="ant-btn-motion">
        Motion
      </Button>
      <Button className="ant-btn-face">
        Face Recognize
      </Button>
      <Button className="ant-btn-temperature">
        High Temperature
      </Button>
    </div>
  )
}



function TableList() {
  const {
    devices,
    loading,
    pageSize,
    sort,
    sortDirection,
    search,
    currentPage,
    liveUpdate,
    deviceType,
    location,
    // selectedIds,
    dispatch
  } = useDeviceContext()
  // const [groupedDevices, setGroupedDevices] = useState<any[]>([])
  const [expandedKeys, setExpandedKeys] = useState<string[]>([])
  const liveUpdateRef = useRef<number>()

  useEffect(() => {
    handleGetDevices()
    // eslint-disable-next-line
  }, [pageSize, sort, sortDirection, search, currentPage, deviceType, location])

  useEffect(() => {
    if (!liveUpdate) {
      return window.clearInterval(liveUpdateRef.current)
    }
    liveUpdateRef.current = window.setInterval(
      handleGetDevices,
      LIVE_UPDATE_INTERVAL
    )
    return () => {
      window.clearInterval(liveUpdateRef.current)
    }
    // eslint-disable-next-line
  }, [
    pageSize,
    sort,
    sortDirection,
    search,
    currentPage,
    deviceType,
    location,
    liveUpdate
  ])

  useEffect(() => {
    let temp: any = {}
    devices.forEach((device: Device) => {
      const locationName = device?.location?.name || 'Unknown'
      const location = temp[locationName] || {
        id: locationName,
        __location: locationName,
        children: []
      }
      location.children = [...location.children, device]
      temp[locationName] = location
    })

    // setGroupedDevices(Object.values(temp))
    setExpandedKeys(Object.keys(temp))
  }, [devices])

  const handleGetDevices = async () => {
    dispatch({ type: 'SET_LOADING' })
    const response = await getDevices({
      pageSize,
      sort,
      sortDirection,
      search,
      currentPage,
      deviceType,
      location
    })
    dispatch({
      type: 'SET_DEVICES',
      payload: response.data
    })
  }

  const handleRowExpand = (expanded: boolean, { id }: any) => {
    setExpandedKeys(prev => {
      if (!expanded) return prev.filter(key => key !== id)
      return [...prev, id]
    })
  }

  // const handleSort = (_: any, __: any, sorter: any, extra: any) => {
  //   if (extra.action === 'sort') {
  //     dispatch({
  //       type: 'SET_SORT',
  //       payload: {
  //         sort: !sorter.order ? 'id' : sorter.columnKey,
  //         sortDirection: sorter.order || 'descend'
  //       }
  //     })
  //   }
  // }

  // const handleRowSelect = (selectedIds: React.ReactText[]) => {
  //   dispatch({
  //     type: 'SET_SELECTED_ID',
  //     payload: selectedIds
  //   })
  // }

  const columns = [
    {
      title: 'TIMESTAMP',
      key: 'time',
      width: 350,
      render :  renderDeviceName,

    },
    {
      title: 'NOTIFICATION CONTENT',
      key: 'notification',
      render:   (devices:any) => renderNotification(devices)
    },
    {
      className:'recipent',
      title: 'NO. OF RECIPIENT',
      key: 'recipent',
      render:   (devices:any) => renderRecipent(devices)
    },
    {
      title: 'TAG',
      key: 'tag',
      render: (devices:any) => renderTag(devices)
    },
    {
      title: '',
      key: 'actions',
      width: 210,
      render: (row: any) => {
        if (row.__location) return
        return (
          <div className="cell-actions">
            <Button>
              <img src={Edit} alt="edit" />
              Edit
            </Button>
            <PopoverConfirm
              onConfirm={() => console.log(row)}
              title="All records of this device will be lost after deleted. Are you sure?"
              subtitle="Action can’t be undone"
            >
              <Button className="ant-btn-secondary">
                <img src={Delete} alt="delete" />
                Delete
              </Button>
            </PopoverConfirm>
          </div>
        )
      }
    }
  ]
  return (
    <React.Fragment>
      <TableListHeader />
      <Table
        loading={loading}
        className="device-table"
        rowKey="id"
        columns={columns}
        dataSource={devices}
        expandable={{
          expandedRowKeys: expandedKeys,
          expandIconColumnIndex: columns.length + 1,
          onExpand: handleRowExpand
        }}
        
        pagination={false}
      />
      <TableListFooter />
    </React.Fragment>
  )
}

export default TableList
