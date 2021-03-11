import React, { useState, useEffect } from 'react'

import SMS from 'assets/icons/sms.svg'
import WhatsApp from 'assets/icons/whatsapp.svg'
import Email from 'assets/icons/email.svg'
import Slack from 'assets/icons/slack.svg'
import Webhook from 'assets/icons/webhook.svg'
import Microsoft from 'assets/icons/microsoft-team.svg'

import { getDeviceCountCard, getCameraLicenseCountCard } from 'services/devices'
import DeviceListProvider from './DeviceListContext'
import StatisticCard from './StatisticCard'
import TableList from './TableList'

function DeviceList() {
  const [deviceCount, setDeviceCount] = useState<any>({})
  const [licenseCount, setLicenseCount] = useState<any>({})

  useEffect(() => {
    getDeviceAndLicenseCount()
  }, [])

  const getDeviceAndLicenseCount = async () => {
    const [device, license] = await Promise.all([
      getDeviceCountCard(),
      getCameraLicenseCountCard()
    ])
    setDeviceCount(device.data.data)
    setLicenseCount(license.data.data)
  }

  return (
    <div className="device-list">
      <DeviceListProvider>
        <div className="statistics-grid">
          <div className="grid-item">
            <StatisticCard
              imgSrc={Email}
              title="Email"
              used={deviceCount.used || 0}
              total={deviceCount.total || 0}
              isCheck={false}
              toUse={false}
            />
          </div>
          <div className="grid-item">
            <StatisticCard
              imgSrc={SMS}
              title="SMS"
              used={licenseCount.used || 0}
              total={licenseCount.total || 0}
              isCheck={false}
              toUse={false}
            />
          </div>
          <div className="grid-item">
            <StatisticCard
              imgSrc={WhatsApp}
              title="WhatsApp"
              used={licenseCount.used || 0}
              total={licenseCount.total || 0}
              isCheck={true}
              toUse={false}
            />
          </div>
          <div className="grid-item">
            <StatisticCard
              imgSrc={Slack}
              title="Slack"
              used={licenseCount.used || 0}
              total={licenseCount.total || 0}
              isCheck={false}
              toUse={false}
            />
          </div>
          <div className="grid-item">
            <StatisticCard
              imgSrc={Microsoft}
              title="Microsoft Team"
              used={licenseCount.used || 0}
              total={licenseCount.total || 0}
              isCheck={true}
              toUse={true}
            />
          </div>
          <div className="grid-item">
            <StatisticCard
              imgSrc={Webhook}
              title="Webhook"
              used={licenseCount.used || 0}
              total={licenseCount.total || 0}
              isCheck={true}
              toUse={true}
            />
          </div>
        </div>
          <TableList />
      </DeviceListProvider>
    </div>
  )
}

export default DeviceList
