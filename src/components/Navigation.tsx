'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/file.svg"
              alt="ShareBin Logo"
              width={24}
              height={24}
              className="dark:invert"
            />
            <span className="font-bold text-xl">ShareBin</span>
          </Link>
        </div>
        
        <div className="flex space-x-4">
          <Link 
            href="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/' 
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' 
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            Home
          </Link>
          <Link 
            href="/new" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/new' 
                ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white' 
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
          >
            New Paste
          </Link>
        </div>
      </nav>
    </header>
  );
}