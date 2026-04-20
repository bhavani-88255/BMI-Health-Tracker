import './StatsWidget.css'

export default function StatsWidget({ label, value, icon, color, sub }) {
  return (
    <div className="stats-widget" style={{ '--widget-color': color }}>
      <div className="widget-icon">{icon}</div>
      <div className="widget-body">
        <div className="widget-value">{value}</div>
        <div className="widget-label">{label}</div>
        {sub && <div className="widget-sub">{sub}</div>}
      </div>
    </div>
  )
}
