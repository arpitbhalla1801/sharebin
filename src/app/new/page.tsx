'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPastePage() {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('plaintext');
  const [content, setContent] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch('/api/paste', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, language, is_private: isPrivate }),
    });

    const data = await res.json();
    if (data.id) router.push(`/share/${data.id}`);
  };

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Paste</h1>
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title (optional)"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <select
        className="w-full mb-2 p-2 border rounded"
        value={language}
        onChange={e => setLanguage(e.target.value)}
      >
        <option value="plaintext">Plain Text</option>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
        <option value="c">C</option>
      </select>
      <textarea
        className="w-full mb-2 p-2 border rounded h-64"
        placeholder="Paste your text or code here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <label className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" checked={isPrivate} onChange={() => setIsPrivate(!isPrivate)} />
        Private
      </label>
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
        Create Paste
      </button>
    </main>
  );
}
