function BackLink() {
  return (
    <div className="fixed top-4 left-4 z-50">
      <a
        href="./"
        className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-lg font-medium shadow-lg border border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Tillbaka
      </a>
    </div>
  )
}

export default BackLink