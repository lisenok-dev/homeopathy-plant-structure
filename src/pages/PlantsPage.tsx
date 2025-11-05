import { useState, useEffect } from 'react'
import FamilyTable from '../components/FamilyTable'
import Modal from '../components/Modal'

interface PlantFamily {
  familyName: string
  description: string
  sensation: string
  passiveReaction: string
  activeReaction: string
  compensation: string
  medicine: string
  familyDescription: string
}

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

export default function PlantsPage() {
  const [families, setFamilies] = useState<PlantFamily[]>([])
  const [miasms, setMiasms] = useState<Miasm[]>([])
  const [selectedMiasm, setSelectedMiasm] = useState<Miasm | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [familiesResponse, miasmsResponse] = await Promise.all([
          fetch('/data/plant-families.json'),
          fetch('/data/miasms.json')
        ])

        if (!familiesResponse.ok || !miasmsResponse.ok) {
          throw new Error('Не удалось загрузить данные')
        }

        const [familiesData, miasmsData] = await Promise.all([
          familiesResponse.json(),
          miasmsResponse.json()
        ])

        setFamilies(familiesData)
        setMiasms(miasmsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleMiasmClick = (miasmName: string) => {
    if (!miasmName) return
    const miasm = miasms.find(m => m.miasm.toLowerCase() === miasmName.toLowerCase())
    
    if (miasm) {
      setSelectedMiasm(miasm)
    }
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
      <FamilyTable families={families} onMiasmClick={handleMiasmClick} />
      
      {selectedMiasm && (
        <Modal miasm={selectedMiasm} onClose={handleCloseModal} />
      )}
    </div>
  )
}
