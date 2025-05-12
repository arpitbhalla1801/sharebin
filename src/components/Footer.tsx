import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} ShareBin
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link 
              href="/" 
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Home
            </Link>
            <Link 
              href="/new" 
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              New Paste
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}