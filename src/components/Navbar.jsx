import React from 'react'
import { Link } from 'react-router'
import { Cloud } from 'lucide-react'

const Navbar = () => {
return ( <nav className='flex items-center justify-between border-b border-gray-200 bg-white px-8 py-4'> <Link to='/' className='flex items-center gap-2 text-2xl font-bold text-gray-900'> <Cloud size={28} /> <span>CloudSketch</span> </Link>

        <div className='flex items-center gap-8'>
            <Link to='/' className='text-sm font-medium text-gray-600 transition-colors hover:text-black'>
                Home
            </Link>

            <Link to='/pipeline' className='text-sm font-medium text-gray-600 transition-colors hover:text-black'>
                DevOps
            </Link>

            <Link to='/saved' className='text-sm font-medium text-gray-600 transition-colors hover:text-black'>
                Projects
            </Link>

            <Link to='/about' className='text-sm font-medium text-gray-600 transition-colors hover:text-black'>
                About
            </Link>
        </div>
    </nav>
)
}

export default Navbar
