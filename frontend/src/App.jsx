import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <div className="page-wrapper">
            <AppRouter />
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
