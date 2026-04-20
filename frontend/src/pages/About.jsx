import './About.css'

const techStack = [
  { name: 'React 18', icon: '⚛️', color: '#61dafb', desc: 'UI library for building interactive interfaces' },
  { name: 'Vite', icon: '⚡', color: '#ffcc00', desc: 'Lightning-fast build tool and dev server' },
  { name: 'React Router', icon: '🧭', color: '#ff6b6b', desc: 'Client-side routing with 4 pages' },
  { name: 'Node.js', icon: '🟢', color: '#00ff88', desc: 'JavaScript runtime for the backend server' },
  { name: 'Express.js', icon: '🚂', color: '#8844ff', desc: 'Minimalist web framework for REST APIs' },
  { name: 'MongoDB', icon: '🍃', color: '#00d4aa', desc: 'NoSQL database to store BMI records' },
  { name: 'Mongoose', icon: '🔗', color: '#ff9944', desc: 'ODM for MongoDB schema and validation' },
  { name: 'Axios', icon: '📡', color: '#4466ff', desc: 'HTTP client for frontend-backend communication' },
]

const pages = [
  { name: 'Dashboard', path: '/', icon: '⬡', desc: 'Overview of stats, recent entries, and BMI reference chart' },
  { name: 'Calculator', path: '/calculator', icon: '◈', desc: 'Calculate BMI, view result with advice, save to MongoDB' },
  { name: 'History', path: '/history', icon: '◉', desc: 'Browse, filter, search, and delete all saved records' },
  { name: 'About', path: '/about', icon: '◎', desc: 'Project info, tech stack, and BMI health guide' },
]

const bmiRanges = [
  { range: 'Below 18.5', category: 'Underweight', risk: 'Nutritional deficiency, bone loss', color: '#4466ff' },
  { range: '18.5 – 24.9', category: 'Normal', risk: 'Low risk — healthy range', color: '#00ff88' },
  { range: '25.0 – 29.9', category: 'Overweight', risk: 'Moderate risk of heart disease', color: '#ffcc00' },
  { range: '30.0 – 34.9', category: 'Obese (Class I)', risk: 'High risk of diabetes, hypertension', color: '#ff9944' },
  { range: '35.0 – 39.9', category: 'Obese (Class II)', risk: 'Very high risk', color: '#ff6644' },
  { range: '40+', category: 'Obese (Class III)', risk: 'Extremely high risk', color: '#cc2200' },
]

export default function About() {
  return (
    <div className="about-page">
      <div className="page-header">
        <div className="header-badge">ABOUT</div>
        <h1 className="page-title">
          About <span className="title-accent">This App</span>
        </h1>
        <p className="page-sub">BMI Health Tracker — built with modern full-stack technologies</p>
      </div>

      {/* Project Info */}
      <div className="about-hero">
        <div className="hero-badge">EXP1-6 Project</div>
        <h2>BMI Health Tracker</h2>
        <p>
          A full-stack web application that helps users calculate, track, and monitor their
          Body Mass Index (BMI) over time. Built using React + Vite for the frontend and
          Node.js + Express + MongoDB for the backend.
        </p>
        <div className="hero-tags">
          <span>Full Stack</span>
          <span>REST API</span>
          <span>MongoDB CRUD</span>
          <span>React Router</span>
          <span>Responsive</span>
        </div>
      </div>

      {/* Pages */}
      <section>
        <h2 className="section-title">Application Pages</h2>
        <div className="pages-grid">
          {pages.map(page => (
            <div key={page.name} className="page-card">
              <div className="page-icon">{page.icon}</div>
              <div>
                <div className="page-name">{page.name}</div>
                <div className="page-path">{page.path}</div>
                <div className="page-desc">{page.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 className="section-title">Tech Stack</h2>
        <div className="tech-grid">
          {techStack.map(tech => (
            <div key={tech.name} className="tech-card" style={{ '--t-color': tech.color }}>
              <div className="tech-icon">{tech.icon}</div>
              <div className="tech-name">{tech.name}</div>
              <div className="tech-desc">{tech.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* BMI Health Info */}
      <section>
        <h2 className="section-title">BMI Health Guide</h2>
        <div className="bmi-table">
          <div className="table-header">
            <span>BMI Range</span>
            <span>Category</span>
            <span>Health Risk</span>
          </div>
          {bmiRanges.map(item => (
            <div key={item.category} className="table-row" style={{ '--row-color': item.color }}>
              <span className="row-range">{item.range}</span>
              <span className="row-category" style={{ color: item.color }}>{item.category}</span>
              <span className="row-risk">{item.risk}</span>
            </div>
          ))}
        </div>
        <p className="disclaimer">
          ⚠️ BMI is a screening tool, not a diagnostic measure. Consult a healthcare professional for medical advice.
        </p>
      </section>

      {/* API Endpoints */}
      <section>
        <h2 className="section-title">API Endpoints</h2>
        <div className="api-list">
          {[
            { method: 'GET', path: '/api/bmi', desc: 'Get all BMI records' },
            { method: 'POST', path: '/api/bmi', desc: 'Create new BMI record' },
            { method: 'GET', path: '/api/bmi/:id', desc: 'Get single record by ID' },
            { method: 'PUT', path: '/api/bmi/:id', desc: 'Update existing record' },
            { method: 'DELETE', path: '/api/bmi/:id', desc: 'Delete a record' },
            { method: 'GET', path: '/api/stats', desc: 'Get statistics and counts' },
          ].map(api => (
            <div key={api.path} className="api-row">
              <span className={`method-badge method-${api.method.toLowerCase()}`}>{api.method}</span>
              <code className="api-path">{api.path}</code>
              <span className="api-desc">{api.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
