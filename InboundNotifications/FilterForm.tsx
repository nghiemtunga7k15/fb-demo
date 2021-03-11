import { Form, Select, Button } from 'antd'

import { useDeviceContext } from './DeviceListContext'
import AsyncSelect from 'components/AsyncSelect'
import { getLocations, Location } from 'services/locations'

interface SubmitValuesType {
  deviceType: string
  location: number
}

function FilterForm() {
  const [form] = Form.useForm()
  const { deviceType, location, dispatch } = useDeviceContext()

  const handleGetLocations = async ({ search = '', page = 1 } = {}) => {
    const response = await getLocations({
      sort: 'id',
      sortDirection: 'desc',
      pageSize: 10,
      search,
      currentPage: page
    })
    return {
      data: response.data.data,
      totalPage: response.data.meta.last_page
    }
  }

  const handleSubmit = ({ deviceType, location }: SubmitValuesType) => {
    if (!deviceType && !location) return
    dispatch({
      type: 'SET_FILTER',
      payload: {
        deviceType: deviceType || '',
        location: location || ''
      }
    })
  }

  const handleReset = () => {
    form.setFieldsValue({
      deviceType: '',
      location: ''
    })
    dispatch({
      type: 'SET_FILTER',
      payload: {
        deviceType: '',
        location: ''
      }
    })
  }

  const mapLocations = (locations: Location[]) =>
    locations.map(({ name, id }: any) => ({ value: id, label: name }))

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      labelAlign="left"
      onFinish={handleSubmit}
      initialValues={{ deviceType, location }}
    >
      <Form.Item label="Device Type" name="deviceType">
        <Select>
          <Select.Option value="Camera">Camera</Select.Option>
          <Select.Option value="Network Video Recorder">
            Network Video Recorder
          </Select.Option>
          <Select.Option value="Digital Video Recorder">
            Digital Video Recorder
          </Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Location" name="location">
        <AsyncSelect
          fetcher={handleGetLocations}
          handleSearch={handleGetLocations}
          handleLoadMore={handleGetLocations}
          mapOptions={mapLocations}
        />
      </Form.Item>
      <Form.Item className="form-buttons">
        <Button className="ant-btn-secondary" onClick={handleReset}>
          Reset Filter
        </Button>
        <Button htmlType="submit" type="primary">
          Apply Filter
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FilterForm
