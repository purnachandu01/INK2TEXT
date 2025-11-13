import { documents } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { DocumentEditor } from './components/document-editor';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function DocumentPage({ params }: { params: { id: string } }) {
  const document = documents.find(doc => doc.id === params.id);

  if (!document) {
    notFound();
  }

  if (document.pages.length === 0) {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center h-96 text-center">
                    <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
                    <h2 className="text-xl font-semibold">Document is processing</h2>
                    <p className="text-muted-foreground">
                        The document "{document.title}" is currently being processed. <br/> Please check back later.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
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
