import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import StatsWidget from '../components/StatsWidget'
import BMICard from '../components/BMICard'
import './Home.css'

export default function Home() {
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, recordsRes] = await Promise.all([
          axios.get('/api/stats'),
          axios.get('/api/bmi')
        ])
        setStats(statsRes.data.data)
        setRecent(recordsRes.data.data.slice(0, 3))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) return <div className="loading-state"><div className="loader" /><p>Loading dashboard...</p></div>

  const categoryMap = {}
  stats?.categories?.forEach(c => { categoryMap[c._id] = c.count })

  return (
    <div className="home-page">
      <div className="page-header">
        <div className="header-badge">DASHBOARD</div>
        <h1 className="page-title">
          Health <span className="title-accent">Overview</span>
        </h1>
        <p className="page-sub">Track your BMI journey and stay healthy</p>
      </div>

      <div className="stats-grid">
        <StatsWidget
          label="Total Records"
          value={stats?.total || 0}
          icon="📊"
          color="var(--accent-green)"
          sub="All time entries"
        />
        <StatsWidget
          label="Average BMI"
          value={stats?.avgBMI || '—'}
          icon="⚖️"
          color="var(--accent-teal)"
          sub="Across all users"
        />
        <StatsWidget
          label="Normal Weight"
          value={categoryMap['Normal weight'] || 0}
          icon="✅"
          color="var(--accent-green)"
          sub="Healthy range"
        />
        <StatsWidget
          label="Need Attention"
          value={(categoryMap['Overweight'] || 0) + (categoryMap['Obese'] || 0)}
          icon="⚠️"
          color="var(--accent-orange)"
          sub="Overweight + Obese"
        />
      </div>

      <div className="section-header">
        <h2>Recent Entries</h2>
        <Link to="/history" className="view-all-btn">View All →</Link>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3>No records yet</h3>
          <p>Start by calculating your BMI</p>
          <Link to="/calculator" className="cta-btn">Calculate BMI</Link>
        </div>
      ) : (
        <div className="cards-grid">
          {recent.map(record => (
            <BMICard key={record._id} record={record} />
          ))}
        </div>
      )}

      <div className="bmi-guide">
        <h2 className="guide-title">BMI Reference Chart</h2>
        <div className="guide-grid">
          {[
            { range: '< 18.5', label: 'Underweight', color: '#4466ff', tip: 'Consider gaining healthy weight' },
            { range: '18.5 – 24.9', label: 'Normal Weight', color: '#00ff88', tip: 'You are in the healthy range!' },
            { range: '25 – 29.9', label: 'Overweight', color: '#ffcc00', tip: 'Consider lifestyle changes' },
            { range: '≥ 30', label: 'Obese', color: '#ff6644', tip: 'Consult a healthcare provider' },
          ].map(item => (
            <div key={item.label} className="guide-card" style={{ '--g-color': item.color }}>
              <div className="guide-range">{item.range}</div>
              <div className="guide-label" style={{ color: item.color }}>{item.label}</div>
              <div className="guide-tip">{item.tip}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
