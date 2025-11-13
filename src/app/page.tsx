import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Edit, FileDown, Bot } from 'lucide-react';
import Logo from '@/components/logo';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm border-b">
        <Link href="#" className="flex items-center justify-center">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Unlock Text from Any Document
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Ink2Text Pro uses advanced OCR and AI to extract text from your photos and scans. Edit, correct, and download in any format.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Start for Free
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <img
                    alt="Hero"
                    className="overflow-hidden rounded-xl object-cover"
                    data-ai-hint="document scanner"
                    height="400"
                    src="https://picsum.photos/seed/ink2text-hero/600/400"
                    width="600"
                  />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Digitize Text</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From uploading documents to exporting corrected text, our platform is designed for seamless productivity.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 xl:grid-cols-4 mt-12">
              <FeatureCard
                icon={<UploadCloud className="w-8 h-8 text-primary" />}
                title="Effortless Upload"
                description="Drag and drop multiple files, including JPEG, PNG, and PDF formats."
              />
              <FeatureCard
                icon={<Bot className="w-8 h-8 text-primary" />}
                title="AI-Powered Correction"
                description="Our GenAI enhances and corrects extracted text for unparalleled accuracy."
              />
              <FeatureCard
                icon={<Edit className="w-8 h-8 text-primary" />}
                title="Intuitive Editor"
                description="Review and edit your extracted text side-by-side with the original document."
              />
              <FeatureCard
                icon={<FileDown className="w-8 h-8 text-primary" />}
                title="Multiple Formats"
                description="Download your text as TXT, DOCX, searchable PDF, or structured JSON."
              />
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Ink2Text Pro. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="text-left bg-card h-full">
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
