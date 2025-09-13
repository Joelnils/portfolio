import { useState } from 'react'

function CollapsibleSection({ title, icon, children, defaultOpen = true, itemCount = null }) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="card border-2 hover:border-gray-300 transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-0 mb-4 text-left group"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
            {title}
          </h3>
          {itemCount !== null && (
            <div className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {itemCount} {itemCount === 1 ? 'vara' : 'varor'}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-500 hidden sm:block">
            {isOpen ? 'Dölj' : 'Visa'}
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={isOpen ? 'pt-2' : ''}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CollapsibleSection