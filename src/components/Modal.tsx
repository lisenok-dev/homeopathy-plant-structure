import { useEffect } from 'react'

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

interface ModalProps {
  miasm: Miasm
  onClose: () => void
}

export default function Modal({ miasm, onClose }: ModalProps) {
  // Закрытие по ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const formatText = (text: string) => {
    if (!text) return null
    return text.split('\n').map((line, idx) => (
      <div key={idx}>
        {line}
      </div>
    ))
  }

  const toTitleCase = (text: string) => {
    if (!text) return ''
    return text
      .split(' ')
      .map(word => {
        if (word.length === 0) return word
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      })
      .join(' ')
  }

  const sections = [
    { title: 'Ключевые слова', content: miasm.keyWords },
    { title: 'Глубина, скорость, ощущение', content: miasm.sensation },
    { title: 'Успех', content: miasm.success },
    { title: 'Неудача', content: miasm.failure },
    { title: 'Образ и картина', content: miasm.image },
    { title: 'Позиция, отношение', content: miasm.position },
    { title: 'Возраст', content: miasm.age },
    { title: 'Игра', content: miasm.game },
    { title: 'Патология', content: miasm.pathology },
    { title: 'Примеры лекарств', content: miasm.medicineExamples },
    { title: 'Лекарства', content: miasm.medicine }
  ]

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">{toTitleCase(miasm.miasm)}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl font-bold leading-none transition-colors"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        {/* Содержимое с прокруткой */}
        <div className="overflow-y-auto p-4 space-y-6" style={{ maxHeight: 'calc(90vh - 100px)' }}>
          {sections.map((section, idx) => {
            // Пропускаем пустые секции
            if (!section.content || section.content.trim() === '') return null

            return (
              <div key={idx} className="border-b border-gray-200 pb-4 last:border-0">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {section.title}
                </h3>
                <div className="text-gray-700 whitespace-pre-line">
                  {formatText(section.content)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
