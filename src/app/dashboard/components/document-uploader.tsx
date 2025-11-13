'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, File as FileIcon, X, Bot, Download, FileText, Loader2, Save } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { extractTextFromImage, ExtractTextFromImageInput } from "@/ai/flows/extract-text-from-image-flow";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

export function DocumentUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (newFiles: FileList | null) => {
    if (newFiles) {
      const filesArray = Array.from(newFiles);
      setFiles(prevFiles => [...prevFiles, ...filesArray]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };
  
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  
  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const triggerFileInput = () => {
    if (isExtracting) return;
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };
  
  const fileToDataUri = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
  }

  const handleUpload = async () => {
    if (files.length === 0) return;
    setIsExtracting(true);
    setExtractedText(null);
    
    try {
      const file = files[0];
      const imageDataUri = await fileToDataUri(file);
      const input: ExtractTextFromImageInput = { imageDataUri };
      const result = await extractTextFromImage(input);
      setExtractedText(result.extractedText);
      toast({
        title: "Text Extracted",
        description: "The text has been successfully extracted from the image.",
      });

    } catch (error) {
        console.error("Error extracting text:", error);
        toast({
            variant: "destructive",
            title: "Extraction Failed",
            description: "Could not extract text from the uploaded file.",
        });
    } finally {
        setIsExtracting(false);
        setFiles([]);
    }
  };

  const downloadText = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const originalFileName = files[0]?.name.split('.').slice(0, -1).join('.') || 'extracted-text';
    a.download = `${originalFileName}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upload Documents</CardTitle>
        <CardDescription>Drag and drop files here or click to browse. Supports JPEG, PNG.</CardDescription>
      </CardHeader>
      <CardContent>
        {extractedText === null ? (
            <>
                <div
                className={cn(
                    "border-2 border-dashed border-muted rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors",
                    isDragging && "bg-muted/50 border-primary",
                    isExtracting && "cursor-not-allowed opacity-50"
                )}
                onClick={triggerFileInput}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                >
                <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="font-semibold">Drag & drop files here</p>
                <p className="text-sm text-muted-foreground">or click to select files</p>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    onChange={onFileChange}
                    accept="image/jpeg,image/png"
                    disabled={isExtracting}
                />
                <p className="text-xs text-muted-foreground mt-4">Max file size: 25MB</p>
                </div>
                {files.length > 0 && (
                <div className="mt-4 space-y-3">
                    <h3 className="text-sm font-medium">Selected Files:</h3>
                    <ul className="space-y-2">
                        {files.map((file, index) => (
                            <li key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md text-sm">
                                <div className="flex items-center gap-2">
                                    <FileIcon className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-medium">{file.name}</span>
                                    <span className="text-muted-foreground">({(file.size / 1024).toFixed(2)} KB)</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(index)}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <Button onClick={handleUpload} className="w-full sm:w-auto" disabled={isExtracting}>
                      {isExtracting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Bot className="mr-2 h-4 w-4" />
                      )}
                      {isExtracting ? 'Extracting...' : `Extract text from ${files.length} file${files.length > 1 ? 's' : ''}`}
                    </Button>
                </div>
                )}
            </>
        ) : (
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Extracted Text</h3>
                <Textarea 
                    value={extractedText}
                    onChange={(e) => setExtractedText(e.target.value)}
                    className="h-64 text-base leading-relaxed"
                />
                <div className="flex flex-wrap gap-2">
                    <Button onClick={downloadText}>
                        <Download className="mr-2 h-4 w-4" />
                        Download TXT
                    </Button>
                    <Button variant="outline" onClick={() => { setExtractedText(null); setFiles([])}}>
                        Upload Another File
                    </Button>
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
