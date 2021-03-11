import React, { createContext, useReducer, useContext } from 'react'

interface State {
  loading: boolean
  devices: any[]
  totalItem: number
  totalPage: number
  currentPage: number
  pageSize: number
  search: string
  sort: string
  sortDirection: string
  liveUpdate: boolean
  deviceType: string
  location: string
  selectedIds: number[]
}

interface Action {
  type: string
  payload?: any
}

const initState: State = {
  loading: false,
  devices: [],
  totalItem: 1,
  totalPage: 1,
  currentPage: 1,
  pageSize: 10,
  search: '',
  sort: 'id',
  sortDirection: 'desc',
  liveUpdate: true,
  deviceType: '',
  location: '',
  selectedIds: []
}

const DeviceContext = createContext<any>(null)

function reducer(state: State, { type, payload }: Action) {
  switch (type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      }
    case 'SET_DEVICES':
      return {
        ...state,
        loading: false,
        devices: payload.data,
        totalItem: payload.meta.total,
        totalPage: payload.meta.last_page
      }
    case 'SET_PAGE_SIZE':
      return {
        ...state,
        pageSize: payload
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: payload
      }
    case 'SET_SEARCH':
      return {
        ...state,
        search: payload,
        currentPage: 1
      }
    case 'SET_LIVE_UPDATE':
      return {
        ...state,
        liveUpdate: payload
      }
    case 'SET_SORT':
      return {
        ...state,
        sort: payload.sort,
        sortDirection: payload.sortDirection.replace('end', '')
      }
    case 'SET_FILTER':
      return {
        ...state,
        deviceType: payload.deviceType,
        location: payload.location
      }
    case 'SET_SELECTED_ID':
      return {
        ...state,
        selectedIds: payload
      }
    default:
      return state
  }
}

const DeviceContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <DeviceContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DeviceContext.Provider>
  )
}

const useDeviceContext = () => {
  return useContext(DeviceContext)
}

export { useDeviceContext, DeviceContextProvider as default }
