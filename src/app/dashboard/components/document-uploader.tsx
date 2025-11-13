'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DocumentUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    // TODO: Implement actual file upload logic
    console.log("Uploading files:", files.map(f => f.name));
    setFiles([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upload Documents</CardTitle>
        <CardDescription>Drag and drop files here or click to browse. Supports JPEG, PNG, and PDF.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            "border-2 border-dashed border-muted rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors",
            isDragging && "bg-muted/50 border-primary"
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
            accept="image/jpeg,image/png,application/pdf"
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
            <Button onClick={handleUpload} className="w-full sm:w-auto">
              Upload {files.length} file{files.length > 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
