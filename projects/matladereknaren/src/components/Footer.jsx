function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Matplan</h3>
            <p className="text-gray-600 text-sm">
              Beräkna näringsvärden för hela veckohandlingen och se hur många matlådor det blir.
              Enkelt, gratis och utan registrering.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Utforska</h4>
            <nav className="space-y-2">
              <a href="inspiration/" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Receptinspiration
              </a>
              <a href="inspiration/budget/" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Budgetrecept
              </a>
              <a href="inspiration/fitness/" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Fitnessrecept
              </a>
              <a href="inspiration/vegetariskt/" className="block text-sm text-gray-600 hover:text-green-600 transition-colors">
                Vegetariska recept
              </a>
            </nav>
          </div>

          {/* Contact/Info Section */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Om projektet</h4>
            <p className="text-sm text-gray-600 mb-3">
              Skapat för att förenkla meal prep och veckoplanering av mat.
            </p>
            <a
              href="https://joelfredriksson.com"
              className="text-sm text-green-600 hover:text-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Av Joel Fredriksson →
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Matplan. Alla rättigheter förbehållna.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-sm text-gray-500">Gjord med</span>
            <span className="text-red-500">❤️</span>
            <span className="text-sm text-gray-500">i Sverige</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer