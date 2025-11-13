'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";

export function DocumentUploader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Upload Documents</CardTitle>
        <CardDescription>Drag and drop files here or click to browse. Supports JPEG, PNG, and PDF.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-muted rounded-lg p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="font-semibold">Drag & drop files here</p>
            <p className="text-sm text-muted-foreground">or click to select files</p>
            <input type="file" className="hidden" multiple />
            <p className="text-xs text-muted-foreground mt-4">Max file size: 25MB</p>
        </div>
      </CardContent>
    </Card>
  );
}
