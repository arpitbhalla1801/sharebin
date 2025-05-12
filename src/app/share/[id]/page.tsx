'use client';

import { useEffect, useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/themes/prism-tomorrow.css';

interface PasteData {
  paste_id: string;
  title: string;
  content: string;
  language: string;
  created_at: string;
}

export default function SharePage({ params }: { params: { id: string } }) {
  const unwrappedParams = use(params);
  const pasteId = unwrappedParams.id;
  
  const [paste, setPaste] = useState<PasteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const response = await fetch(`/api/paste/${pasteId}`);
        if (!response.ok) {
          throw new Error('Paste not found');
        }
        const data = await response.json();
        setPaste(data);
      } catch (err) {
        setError('Failed to load paste. It might have been removed or is private.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [pasteId]);

  useEffect(() => {
    if (paste && !loading) {
      Prism.highlightAll();
    }
  }, [paste, loading]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 w-48 mb-8"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 w-full rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 text-center">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
            {error}
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            The paste you're looking for might have been removed or is private.
          </p>
          <Link
            href="/new"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
          >
            Create a new paste
          </Link>
        </div>
      </div>
    );
  }

  if (!paste) return null;

  const formattedDate = new Date(paste.created_at).toLocaleString();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {paste.title || 'Untitled Paste'}
          </h1>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Language: {paste.language}</span>
            <span>Created: {formattedDate}</span>
          </div>
        </div>
        <div className="p-6 overflow-auto">
          <pre className="language-{paste.language}">
            <code>{paste.content}</code>
          </pre>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                alert('Copied to clipboard!');
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Copy Text
            </button>
          </div>
          <Link
            href="/new"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
          >
            Create New Paste
          </Link>
        </div>
      </div>
    </div>
  );
}
