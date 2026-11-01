import { useState } from 'react';
import { Link } from 'react-router';
import { Cloud } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/saved' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="relative z-50 border-b border-gray-200 bg-white pl-2 pr-2 py-4 sm:pl-3 sm:pr-3">
      <div className="flex w-full items-center justify-between">

        {/* LOGO */}
        <Link to="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-2 text-xl font-bold text-gray-900 transition-opacity hover:opacity-75 sm:text-2xl"
        >
          <Cloud size={28} strokeWidth={2.2} />
          <span>CloudSketch</span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="
                rounded-lg px-4 py-2.5
                text-sm font-medium text-gray-600
                transition-all duration-200
                hover:bg-gray-100 hover:text-gray-900"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="
            flex h-10 w-10 flex-col items-center justify-center gap-1.5
            rounded-lg text-gray-900 transition-colors
            hover:bg-gray-100
            md:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`h-0.5 w-5 bg-gray-900 transition-all duration-300 ${
              mobileMenuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />

          <span
            className={`h-0.5 w-5 bg-gray-900 transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          />

          <span
            className={`h-0.5 w-5 bg-gray-900 transition-all duration-300 ${
              mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileMenuOpen && (
        <div
          className="
            mt-4 rounded-xl border border-gray-200
            bg-white p-3
            shadow-lg
            md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="
                block rounded-lg px-4 py-3
                text-sm font-medium text-gray-600
                transition-all duration-200
                hover:bg-gray-100 hover:text-gray-900"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
