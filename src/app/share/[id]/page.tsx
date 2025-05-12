import { connectDB } from '@/lib/db';
import Paste from '@/models/Paste';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';

export async function generateMetadata({ params }: { params: { id: string } }) {
  return { title: `ShareBin - ${params.id}` };
}

export default async function SharePage({ params }: { params: { id: string } }) {
  await connectDB();
  const paste = await Paste.findOne({ paste_id: params.id }).lean();

  if (!paste) return <div className="p-8 text-red-600">Paste not found.</div>;

  const highlighted = Prism.highlight(paste.content, Prism.languages[paste.language] || Prism.languages.plaintext, paste.language);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-2">{paste.title || 'Untitled Paste'}</h1>
      <p className="text-sm text-gray-500 mb-4">Language: {paste.language}</p>
      <pre dangerouslySetInnerHTML={{ __html: highlighted }} />
    </main>
  );
}
