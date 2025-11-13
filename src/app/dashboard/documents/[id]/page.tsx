import { documents } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { DocumentEditor } from './components/document-editor';

export default function DocumentPage({ params }: { params: { id: string } }) {
  const document = documents.find(doc => doc.id === params.id);

  if (!document || !document.pages.length) {
    notFound();
  }

  const page = document.pages[0];

  return (
    <div className="grid md:grid-cols-2 gap-8 h-full max-h-[calc(100vh-120px)]">
      <div className="bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
        <div className="relative w-full h-full">
            <Image 
                src={page.imageUrl}
                alt={`Page ${page.pageNumber} of ${document.title}`}
                fill
                className="object-contain"
                data-ai-hint={page.imageHint}
            />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <DocumentEditor document={document} />
      </div>
    </div>
  );
}
