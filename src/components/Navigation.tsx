interface NavigationProps {
  currentPage: 'venus' | 'plants'
  onNavigate: (page: 'venus' | 'plants') => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Миазмы и растительные семейства
          </h1>
          
          <div className="flex gap-2">
            <button
              onClick={() => onNavigate('venus')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'venus'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Миазмы
            </button>
            <button
              onClick={() => onNavigate('plants')}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                currentPage === 'plants'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Растительные семейства
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
