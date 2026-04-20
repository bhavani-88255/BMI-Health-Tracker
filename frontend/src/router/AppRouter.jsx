import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Calculator from '../pages/Calculator'
import History from '../pages/History'
import About from '../pages/About'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
      <Route path="/history" element={<History />} />
      <Route path="/about" element={<About />} />
    </Routes>
  )
}
