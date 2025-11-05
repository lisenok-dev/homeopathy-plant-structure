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

interface VenusWithMiasmasProps {
  miasms: Miasm[]
  onMiasmClick: (miasm: Miasm) => void
}

export default function VenusWithMiasmas({ miasms, onMiasmClick }: VenusWithMiasmasProps) {
  const venusImageUrl = "/images/venus_miasma_schema.png"

  // Позиции миазмов согласно описанию с улучшенным позиционированием
  const miasmPositions = [
    // Вверху (над головой)
    { miasmName: 'ОСТРЫЙ', x: 50, y: 5, color: '#FF6B6B' },
    
    // Область живота
    { miasmName: 'СИКОТИЧЕСКИЙ', x: 50, y: 55, color: '#DFE6E9' },
    
    // Внизу (в области ступней)
    { miasmName: 'СИФИЛИТИЧЕСКИЙ', x: 50, y: 90, color: '#A29BFE' },
    
    // Между острым с сикотическим (слева)
    { miasmName: 'МАЛЯРИЙНЫЙ', x: 35, y: 30, color: '#FFEAA7' },
    
    // Между острым с сикотическим (справа)
    { miasmName: 'ТИФОИДНЫЙ', x: 65, y: 20, color: '#4ECDC4' },
    { miasmName: 'ПСОРИЧЕСКИЙ', x: 65, y: 30, color: '#45B7D1' },
    { miasmName: 'ГРИБКОВЫЙ', x: 65, y: 40, color: '#96CEB4' },
    
    // Между сикотическим и сифилистическим (слева)
    { miasmName: 'ТУБЕРКУЛЕЗНЫЙ', x: 35, y: 65, color: '#B19CD9' },
    { miasmName: 'ЛЕПРОЗНЫЙ', x: 35, y: 80, color: '#FFB6C1' },
    
    // Между сикотическим и сифилистическим (справа)
    { miasmName: 'РАКОВЫЙ', x: 65, y: 70, color: '#FFA07A' }
  ]

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      {/* Изображение Венеры с миазмами */}
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl">
        
        {/* Контейнер с фиксированным соотношением сторон */}
        <div className="relative w-full h-96 md:h-[500px]">
          <img 
            src={venusImageUrl}
            alt="Венера"
            className="w-full h-full object-contain rounded-b-lg"
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23f0f0f0" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23999" font-size="20"%3EВенера%3C/text%3E%3C/svg%3E'
            }}
          />
          
          {/* Миазмы как кликабельные блоки на изображении */}
          {miasms.map((miasm) => {
            const position = miasmPositions.find(p => p.miasmName === miasm.miasm)
            if (!position) return null

            return (
              <div
                key={miasm.miasm}
                onClick={() => onMiasmClick(miasm)}
                className="absolute cursor-pointer transition-all duration-200 hover:scale-110 hover:z-50"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: position.color,
                  border: '2px solid #333',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: '#333',
                  textAlign: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  minWidth: '70px',
                  lineHeight: '1.1',
                  zIndex: 20
                }}
              >
                <span className="pointer-events-none select-none block">
                  {miasm.miasm.split(' ').map((word, idx) => (
                    <span key={idx} className="block">
                      {word}
                    </span>
                  ))}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}