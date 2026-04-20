import { useEffect, useState } from 'react'
import axios from 'axios'
import BMICard from '../components/BMICard'
import './History.css'

const FILTERS = ['All', 'Underweight', 'Normal weight', 'Overweight', 'Obese']

export default function History() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const fetchRecords = async () => {
    try {
      const res = await axios.get('/api/bmi')
      setRecords(res.data.data)
    } catch {
      setError('Failed to load records. Make sure the server is running.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchRecords() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this record?')) return
    try {
      await axios.delete(`/api/bmi/${id}`)
      setRecords(prev => prev.filter(r => r._id !== id))
    } catch {
      alert('Failed to delete record.')
    }
  }

  const filtered = records.filter(r => {
    const matchFilter = filter === 'All' || r.category === filter
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="history-page">
      <div className="page-header">
        <div className="header-badge">HISTORY</div>
        <h1 className="page-title">
          All <span className="title-accent">Records</span>
        </h1>
        <p className="page-sub">Browse and manage all BMI entries from MongoDB</p>
      </div>

      <div className="history-controls">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div className="filter-tabs">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-tab ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="history-meta">
        <span className="meta-count">
          Showing <strong>{filtered.length}</strong> of <strong>{records.length}</strong> records
        </span>
      </div>

      {error && <div className="error-banner">{error}</div>}

      {loading ? (
        <div className="loading-state">
          <div className="loader" />
          <p>Loading records from MongoDB...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🗂️</div>
          <h3>No records found</h3>
          <p>{search || filter !== 'All' ? 'Try adjusting your search or filter' : 'Start calculating BMI to add records'}</p>
        </div>
      ) : (
        <div className="history-grid">
          {filtered.map(record => (
            <BMICard key={record._id} record={record} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
