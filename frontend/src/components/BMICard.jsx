import './BMICard.css'

const categoryColors = {
  'Underweight': '#4466ff',
  'Normal weight': '#00ff88',
  'Overweight': '#ffcc00',
  'Obese': '#ff6644',
}

const categoryEmoji = {
  'Underweight': '📉',
  'Normal weight': '✅',
  'Overweight': '⚠️',
  'Obese': '🚨',
}

export default function BMICard({ record, onDelete }) {
  const color = categoryColors[record.category] || '#00ff88'
  const emoji = categoryEmoji[record.category] || '📊'
  const date = new Date(record.date).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className="bmi-card" style={{ '--card-accent': color }}>
      <div className="card-header">
        <div className="card-avatar">
          {record.name.charAt(0).toUpperCase()}
        </div>
        <div className="card-info">
          <h3>{record.name}</h3>
          <span className="card-date">{date}</span>
        </div>
        <div className="card-emoji">{emoji}</div>
      </div>

      <div className="card-bmi">
        <span className="bmi-value">{record.bmi}</span>
        <span className="bmi-label">BMI</span>
      </div>

      <div className="card-category" style={{ color }}>
        {record.category}
      </div>

      <div className="card-stats">
        <div className="stat">
          <span className="stat-value">{record.age}</span>
          <span className="stat-label">Age</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">{record.height}</span>
          <span className="stat-label">cm</span>
        </div>
        <div className="stat-divider" />
        <div className="stat">
          <span className="stat-value">{record.weight}</span>
          <span className="stat-label">kg</span>
        </div>
      </div>

      <div className="card-bar">
        <div
          className="card-bar-fill"
          style={{
            width: `${Math.min((record.bmi / 40) * 100, 100)}%`,
            background: color
          }}
        />
      </div>

      {onDelete && (
        <button className="card-delete" onClick={() => onDelete(record._id)}>
          ✕ Delete
        </button>
      )}
    </div>
  )
}
