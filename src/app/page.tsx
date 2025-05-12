import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Welcome to ShareBin
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A simple and efficient way to share code snippets and text with others.
          Create pastes in multiple programming languages and share them instantly.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/new"
            className="rounded-md bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Create a Paste
          </Link>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 mb-4">
              <Image 
                src="/file.svg" 
                alt="Code sharing" 
                width={24} 
                height={24}
                className="dark:invert"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Code Sharing</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Share code snippets in multiple programming languages with syntax highlighting.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 mb-4">
              <Image 
                src="/globe.svg" 
                alt="Instant sharing" 
                width={24} 
                height={24}
                className="dark:invert"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Instant Sharing</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Get a shareable link immediately after creating your paste.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 mb-4">
              <Image 
                src="/window.svg" 
                alt="Privacy options" 
                width={24} 
                height={24}
                className="dark:invert"
              />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Privacy Options</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Choose to make your pastes private for enhanced security.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
