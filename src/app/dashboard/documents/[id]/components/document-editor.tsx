'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { type Document } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Bot, Download, FileJson, FileText, FileType, Loader2, Save } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { getAiCorrectedText } from '@/lib/actions';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const FormSchema = z.object({
  text: z.string(),
});

export function DocumentEditor({ document }: { document: Document }) {
  const page = document.pages[0];
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      text: page.ocrText,
    },
  });

  const [state, formAction] = useFormState(getAiCorrectedText, {
    message: '',
    correctedText: '',
  });

  useEffect(() => {
    if (state?.correctedText) {
      form.setValue('text', state.correctedText);
      toast({
        title: "Success",
        description: "AI correction applied.",
      });
    } else if (state?.message && !state.correctedText) {
        toast({
            variant: "destructive",
            title: "Error",
            description: state.message,
        });
    }
  }, [state, form, toast]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Saving data:", data);
    toast({
      title: "Saved!",
      description: "Your changes have been saved.",
    });
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="font-headline">{document.title}</CardTitle>
                <CardDescription>
                    Language: {document.language} | Version: 1 (Latest)
                </CardDescription>
            </div>
             <SubmitButton />
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        <Form {...form}>
            <form 
                action={formAction}
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4 flex-grow"
            >
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem className="flex-grow flex flex-col">
                            <FormControl>
                                <Textarea
                                {...field}
                                className="flex-grow w-full h-full resize-none text-base leading-relaxed"
                                placeholder="Extracted text will appear here..."
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-2 flex-wrap">
                    <Button type="submit">
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                    <SubmitButton />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>TXT</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FileType className="mr-2 h-4 w-4" />
                            <span>DOCX</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>PDF</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <FileJson className="mr-2 h-4 w-4" />
                            <span>JSON</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </form>
        </Form>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" name="_action" value="ai-correct" disabled={pending} variant="secondary">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Bot className="mr-2 h-4 w-4" />
      )}
      Correct with AI
    </Button>
  );
}
