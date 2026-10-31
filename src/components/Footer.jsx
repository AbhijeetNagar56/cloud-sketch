import React from 'react'
import { Link } from 'react-router'
import { Cloud } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-3 inline-flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600 text-white">
                <Cloud size={21} />
              </div>

              <span className="text-xl font-bold tracking-tight text-slate-900">
                CloudSketch
              </span>
            </Link>

            <p className="max-w-full text-sm leading-6 text-slate-500 lg:whitespace-nowrap">
              Design your cloud architecture visually. Build, connect, and explore your infrastructure with a simple visual editor.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col gap-2 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} CloudSketch. All rights reserved.
          </p>

          <p className="text-xs text-slate-500">
            Designed for visual thinkers and cloud builders.
          </p>
        </div>

      </div>
    </footer>
  )
}