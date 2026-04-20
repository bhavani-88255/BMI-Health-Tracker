import { useState } from 'react'
import axios from 'axios'
import './Calculator.css'

const categoryColors = {
  'Underweight': '#4466ff',
  'Normal weight': '#00ff88',
  'Overweight': '#ffcc00',
  'Obese': '#ff6644',
}

const categoryAdvice = {
  'Underweight': 'Your BMI is below the healthy range. Consider consulting a nutritionist to gain healthy weight through a balanced diet.',
  'Normal weight': 'Great job! Your BMI is in the healthy range. Maintain your current lifestyle with regular exercise and a balanced diet.',
  'Overweight': 'Your BMI is above the healthy range. Consider incorporating more physical activity and a balanced diet into your routine.',
  'Obese': 'Your BMI indicates obesity. We strongly recommend consulting a healthcare professional for personalized guidance.',
}

export default function Calculator() {
  const [form, setForm] = useState({ name: '', age: '', height: '', weight: '' })
  const [result, setResult] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const calculateBMI = () => {
    const { name, age, height, weight } = form
    if (!name || !age || !height || !weight) {
      setError('Please fill in all fields')
      return
    }
    if (height <= 0 || weight <= 0 || age <= 0) {
      setError('Values must be greater than 0')
      return
    }

    const h = parseFloat(height) / 100
    const bmiVal = parseFloat((parseFloat(weight) / (h * h)).toFixed(2))

    let category = ''
    if (bmiVal < 18.5) category = 'Underweight'
    else if (bmiVal < 25) category = 'Normal weight'
    else if (bmiVal < 30) category = 'Overweight'
    else category = 'Obese'

    setResult({ bmi: bmiVal, category })
    setSaved(false)
  }

  const saveRecord = async () => {
    setSaving(true)
    try {
      await axios.post('/api/bmi', form)
      setSaved(true)
    } catch (err) {
      setError('Failed to save record. Check server connection.')
    } finally {
      setSaving(false)
    }
  }

  const reset = () => {
    setForm({ name: '', age: '', height: '', weight: '' })
    setResult(null)
    setSaved(false)
    setError('')
  }

  const accentColor = result ? categoryColors[result.category] : 'var(--accent-green)'
  const bmiPercent = result ? Math.min((result.bmi / 40) * 100, 100) : 0

  return (
    <div className="calculator-page">
      <div className="page-header">
        <div className="header-badge">CALCULATOR</div>
        <h1 className="page-title">
          BMI <span className="title-accent">Calculator</span>
        </h1>
        <p className="page-sub">Enter your details to calculate your Body Mass Index</p>
      </div>

      <div className="calc-layout">
        {/* Form */}
        <div className="calc-form-card">
          <h2 className="card-title">Your Details</h2>

          {error && <div className="error-msg">{error}</div>}

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Age <span className="unit-tag">years</span></label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                placeholder="25"
                min="1"
                max="120"
              />
            </div>
            <div className="form-group">
              <label>Height <span className="unit-tag">cm</span></label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                placeholder="170"
                min="50"
                max="300"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Weight <span className="unit-tag">kg</span></label>
            <input
              type="number"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              placeholder="65"
              min="1"
              max="500"
            />
          </div>

          <div className="form-actions">
            <button className="calc-btn primary" onClick={calculateBMI}>
              Calculate BMI
            </button>
            <button className="calc-btn ghost" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="calc-result-card" style={{ '--r-color': accentColor }}>
          {!result ? (
            <div className="result-placeholder">
              <div className="placeholder-ring">
                <span>?</span>
              </div>
              <p>Fill in your details to see your BMI result</p>
            </div>
          ) : (
            <div className="result-content">
              <div className="result-ring" style={{ borderColor: accentColor }}>
                <div className="result-bmi">{result.bmi}</div>
                <div className="result-bmi-label">BMI</div>
              </div>

              <div className="result-category" style={{ color: accentColor }}>
                {result.category}
              </div>

              <div className="result-scale">
                <div className="scale-track">
                  <div
                    className="scale-fill"
                    style={{ width: `${bmiPercent}%`, background: accentColor }}
                  />
                  <div className="scale-pointer" style={{ left: `${bmiPercent}%` }} />
                </div>
                <div className="scale-labels">
                  <span>0</span>
                  <span>18.5</span>
                  <span>25</span>
                  <span>30</span>
                  <span>40+</span>
                </div>
              </div>

              <div className="result-advice" style={{ borderColor: accentColor }}>
                <div className="advice-icon">💡</div>
                <p>{categoryAdvice[result.category]}</p>
              </div>

              {!saved ? (
                <button
                  className="save-btn"
                  onClick={saveRecord}
                  disabled={saving}
                  style={{ background: accentColor }}
                >
                  {saving ? 'Saving...' : '💾 Save to MongoDB'}
                </button>
              ) : (
                <div className="saved-msg">✅ Record saved successfully!</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
