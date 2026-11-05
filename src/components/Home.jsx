import { useState } from 'react'
import { Link } from 'react-router'
import { ChevronDown } from 'lucide-react'
import Navbar from './Navbar'
import ArchitecturePreview from './Architecture_preview'
import Footer from './Footer'

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="px-6 py-20 text-center justify-self-center">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Cloud architecture, simplified
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-6xl">
            Design Your Cloud Architecture Visually.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            Design, connect, and visualize cloud services in one workspace.
            Turn complex infrastructure ideas into clear architecture diagrams.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {/* Start Building dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-700"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Start Building
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-1/2 z-50 mt-2 w-60 -translate-x-1/2 overflow-hidden rounded-lg border border-gray-200 bg-white py-2 text-left shadow-xl">
                  <Link
                    to="/architecture"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="block text-sm font-semibold text-gray-900">
                      Architecture Builder
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      Design cloud infrastructure
                    </span>
                  </Link>

                  <Link
                    to="/pipeline"
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-3 transition-colors hover:bg-gray-100"
                  >
                    <span className="block text-sm font-semibold text-gray-900">
                      DevOps Pipeline
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      Design deployment workflows
                    </span>
                  </Link>
                </div>
              )}
            </div>

            {/* Saved Projects button */}
            <Link
              to="/Saved"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Saved Projects
            </Link>
          </div>
        </div>
      </main>

      <ArchitecturePreview />
      <Footer />
    </div>
  )
}

export default Home
