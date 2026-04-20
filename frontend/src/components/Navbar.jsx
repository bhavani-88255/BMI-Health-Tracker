import { NavLink } from 'react-router-dom'
import './Navbar.css'

const navItems = [
  { path: '/', label: 'Dashboard', icon: '⬡' },
  { path: '/calculator', label: 'Calculator', icon: '◈' },
  { path: '/history', label: 'History', icon: '◉' },
  { path: '/about', label: 'About', icon: '◎' },
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-icon">
          <span>B</span>
        </div>
        <div className="logo-text">
          <span className="logo-title">BMI</span>
          <span className="logo-sub">Health Tracker</span>
        </div>
      </div>

      <div className="nav-section-label">MENU</div>

      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              <span className="nav-dot" />
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="navbar-footer">
        <div className="status-dot" />
        <span>MongoDB Connected</span>
      </div>
    </nav>
  )
}
