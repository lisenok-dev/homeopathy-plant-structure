import { useState } from 'react'

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

interface FamilyTableProps {
  families: PlantFamily[]
  onMiasmClick: (miasmName: string) => void
}

export default function FamilyTable({ families, onMiasmClick }: FamilyTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredFamilies = families.filter(family =>
    family.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.sensation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.medicine.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  const highlightText = (text: string, search: string) => {
    if (!text || !search) return text
    
    const parts = text.split(new RegExp(`(${search})`, 'gi'))
    return parts.map((part, index) => 
      part.toLowerCase() === search.toLowerCase() 
        ? <mark key={index} className="bg-yellow-300 rounded">{part}</mark>
        : part
    )
  }
  
  const formatText = (text: string) => {
    if (!text) return ''
    // Заменяем \n на <br>
    return text.split('\n').filter(line => line.trim()).join('\n')
  }

  const parseMedicine = (medicineText: string) => {
    if (!medicineText) return []
    
    // Парсим лекарства в формате "Rhus-t (Тифоидный)"
    const lines = medicineText.split('\n').filter(line => line.trim())
    return lines.map(line => {
      const match = line.match(/^(.+?)\s*\((.+?)\)$/)
      if (match) {
        return {
          medicine: match[1].trim(),
          miasm: match[2].trim()
        }
      }
      return {
        medicine: line.trim(),
        miasm: null
      }
    })
  }

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-lg">
      {/* Поиск */}
      <div className="p-4 border-b border-gray-200">
        <div className="max-w-md">
          <input
            type="text"
            placeholder="Поиск по семействам, ощущениям, лекарствам..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <th className="px-4 py-3 text-left font-semibold border-b-2 border-white">
                Семейство
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b-2 border-white">
                Ощущение
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b-2 border-white">
                Пассивная реакция
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b-2 border-white">
                Активная реакция
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b-2 border-white">
                Компенсация
              </th>
              <th className="px-4 py-3 text-left font-semibold border-b-2 border-white">
                Лекарства
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFamilies.map((family, index) => {
              const medicines = parseMedicine(family.medicine)
              
              return (
                <tr 
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-purple-50 transition-colors`}
                >
                  <td className="px-4 py-3 border-b border-gray-200" style={{ verticalAlign: 'top' }}>
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        {highlightText(family.familyName, searchTerm)}
                      </div>
                      <div className="text-gray-700 text-sm">
                        {highlightText(family.description, searchTerm)}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm whitespace-pre-line" style={{ verticalAlign: 'top' }}>
                    {highlightText(formatText(family.sensation), searchTerm)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm whitespace-pre-line" style={{ verticalAlign: 'top' }}>
                    {highlightText(formatText(family.passiveReaction), searchTerm)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm whitespace-pre-line" style={{ verticalAlign: 'top' }}>
                    {highlightText(formatText(family.activeReaction), searchTerm)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-gray-700 text-sm whitespace-pre-line" style={{ verticalAlign: 'top' }}>
                    {highlightText(formatText(family.compensation), searchTerm)}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm" style={{ verticalAlign: 'top' }}>
                    <div className="space-y-1">
                      {medicines.map((med, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-gray-700">
                            {highlightText(med.medicine, searchTerm)}
                          </span>
                          {med.miasm && (
                            <button
                              onClick={() => onMiasmClick(med.miasm!)}
                              className="text-purple-600 hover:text-pink-600 font-medium hover:underline transition-colors cursor-pointer text-xs"
                            >
                              ({highlightText(med.miasm, searchTerm)})
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {families.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Нет данных о растительных семействах
        </div>
      )}

      {families.length > 0 && filteredFamilies.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          По запросу {highlightText(`"${searchTerm}"`, searchTerm)} ничего не найдено
        </div>
      )}
    </div>
  )
}
