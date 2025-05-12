'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewPastePage() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('Please add some content to your paste');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/paste', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, language, is_private: isPrivate }),
      });

      const data = await res.json();
      if (data.id) router.push(`/share/${data.id}`);
    } catch (error) {
      console.error('Error creating paste:', error);
      alert('Failed to create paste. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create a Paste</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Share your code or text with the world or keep it private
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title (optional)
            </label>
            <input
              id="title"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter a title for your paste"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Language
            </label>
            <select
              id="language"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="plaintext">Plain Text</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content
            </label>
            <textarea
              id="content"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm font-mono dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Paste your text or code here..."
              rows={12}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <input
                id="private"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isPrivate}
                onChange={() => setIsPrivate(!isPrivate)}
              />
              <label htmlFor="private" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Private paste
              </label>
            </div>
          </div>
          
          <div className="flex justify-end gap-x-3">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </Link>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !content.trim()}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Creating...' : 'Create Paste'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
