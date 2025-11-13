import { PlaceHolderImages } from './placeholder-images';

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'admin' | 'user';
  createdAt: string;
};

export type DocumentStatus = 'processing' | 'completed' | 'failed';

export type Document = {
  id: string;
  title: string;
  status: DocumentStatus;
  userId: string;
  language: string;
  createdAt: string;
  pages: {
    pageNumber: number;
    imageUrl: string;
    imageHint: string;
    ocrText: string;
  }[];
};

export type Job = {
    id: string;
    documentId: string;
    type: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
    createdAt: string;
    finishedAt: string | null;
    errorMessage: string | null;
}

export const users: User[] = [];

export const documents: Document[] = [];

export const jobs: Job[] = [];
