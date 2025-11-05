import { useState, useEffect } from 'react'
import VenusWithMiasmas from '../components/VenusWithMiasmas'
import Modal from '../components/Modal'

interface Miasm {
  miasm: string
  keyWords: string
  sensation: string
  success: string
  failure: string
  image: string
  position: string
  age: string
  game: string
  pathology: string
  medicineExamples: string
  medicine: string
}

export default function VenusPage() {
  const [miasms, setMiasms] = useState<Miasm[]>([])
  const [selectedMiasm, setSelectedMiasm] = useState<Miasm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/miasms.json')
        if (!response.ok) {
          throw new Error('Не удалось загрузить данные миазмов')
        }
        const data = await response.json()
        setMiasms(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке данных')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleMiasmClick = (miasm: Miasm) => {
    setSelectedMiasm(miasm)
  }

  const handleCloseModal = () => {
    setSelectedMiasm(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <h3 className="text-red-800 font-semibold mb-2">Ошибка</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <VenusWithMiasmas miasms={miasms} onMiasmClick={handleMiasmClick} />
      
      {selectedMiasm && (
        <Modal miasm={selectedMiasm} onClose={handleCloseModal} />
      )}
    </div>
  )
}
