import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="flex w-full flex-col gap-2 px-3 py-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} CloudSketch. All rights reserved.
        </p>

        <p className="text-xs text-slate-500">
          Designed for visual thinkers and cloud builders.
        </p>

      </div>
    </footer>
  )
}