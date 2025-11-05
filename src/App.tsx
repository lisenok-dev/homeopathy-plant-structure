import { useState } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import VenusPage from './pages/VenusPage'
import PlantsPage from './pages/PlantsPage'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'venus' | 'plants'>('venus')

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        
        <main className="container mx-auto px-4 py-6">
          {currentPage === 'venus' ? <VenusPage /> : <PlantsPage />}
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default App
