import { Link } from 'react-router-dom'
// import ApexChart from 'react-apexcharts'

import './index.scss'

interface Props {
  imgSrc: string
  title: string
  used: number
  total: number
  isCheck: boolean
  toUse: boolean
}

function renderUpgrade(_isCheck: any, _toUse: any) {
  if (_isCheck === false ) return null
  return (
    <div>{renderUpgradeToUse(_toUse)}</div>
  )
}
function renderUpgradeToUse(_toUse: any) {
  if (_toUse === true ) return <div className="upgrade-to-use"><Link to="/">Upgrade to use</Link></div>
  return (
    <div className="upgrade"><Link to="/">Upgrade</Link></div>
  )
}

function StatisticCard({ imgSrc, title, total, used, isCheck, toUse }: Props) {
  if (title === 'Microsoft Team' || title === 'Webhook' ) {
    return (
    <div className="statistic-card">
      <div className="statistic-img">
        <img src={imgSrc} alt={imgSrc} />
      </div>
      <div className="statistic-desc">
        <h1 className="title">{title}</h1>
        {renderUpgrade(isCheck, toUse)}
      </div>
    </div>
  )
  }
  return (
    <div className="statistic-card">
      <div className="statistic-img">
        <img src={imgSrc} alt={imgSrc} />
      </div>
      <div className="statistic-desc">
        <h1 className="title">{title}</h1>
        {title === 'Slack' ?
        <span className="">Unlimited</span> :
        <span className={ title === 'WhatsApp' ? 'total-full' : 'total'} >{`${used}/${total}`}</span>
        }
      </div>
      {renderUpgrade(isCheck, toUse)}
    </div>
  )
}

export default StatisticCard
