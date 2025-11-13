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

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@ink2text.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || '',
    role: 'admin',
    createdAt: '2023-10-01T10:00:00Z',
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || '',
    role: 'user',
    createdAt: '2023-10-02T11:30:00Z',
  },
];

export const documents: Document[] = [
  {
    id: 'doc-1',
    title: 'Project Proposal Q4.pdf',
    status: 'completed',
    userId: '1',
    language: 'English',
    createdAt: '2023-10-28T14:00:00Z',
    pages: [
      {
        pageNumber: 1,
        imageUrl: PlaceHolderImages.find(img => img.id === 'printed-doc')?.imageUrl || '',
        imageHint: PlaceHolderImages.find(img => img.id === 'printed-doc')?.imageHint || '',
        ocrText: 'Project Proposal for Q4 2024\n\nThis document outlines the proposal for the upcoming quarter. We will focus on three key areas of development...\n\n1. User Authentication Flow\n2. Document Processing Engine\n3. AI Correction Module',
      },
    ],
  },
  {
    id: 'doc-2',
    title: 'Meeting Notes.jpeg',
    status: 'completed',
    userId: '2',
    language: 'English',
    createdAt: '2023-10-27T09:15:00Z',
    pages: [
        {
            pageNumber: 1,
            imageUrl: PlaceHolderImages.find(img => img.id === 'handwritten-doc')?.imageUrl || '',
            imageHint: PlaceHolderImages.find(img => img.id === 'handwritten-doc')?.imageHint || '',
            ocrText: 'Meeting Notes - Oct 27\n\n- Discussed Q4 roadmap\n- Action item: Alice to finalize budget\n- Bob to create initial wireframes\n- Follow up next week'
        }
    ]
  },
  {
    id: 'doc-3',
    title: 'Invoice-123.png',
    status: 'processing',
    userId: '1',
    language: 'English',
    createdAt: '2023-10-29T11:00:00Z',
    pages: [],
  },
  {
    id: 'doc-4',
    title: 'blurry_receipt.jpg',
    status: 'failed',
    userId: '2',
    language: 'English',
    createdAt: '2023-10-29T12:30:00Z',
    pages: [
        {
            pageNumber: 1,
            imageUrl: PlaceHolderImages.find(img => img.id === 'failed-doc')?.imageUrl || '',
            imageHint: PlaceHolderImages.find(img => img.id === 'failed-doc')?.imageHint || '',
            ocrText: ''
        }
    ]
  },
];

export const jobs: Job[] = [
    {
        id: 'job-1',
        documentId: 'doc-3',
        type: 'ocr',
        status: 'processing',
        progress: 50,
        createdAt: '2023-10-29T11:00:00Z',
        finishedAt: null,
        errorMessage: null,
    },
    {
        id: 'job-2',
        documentId: 'doc-4',
        type: 'ocr',
        status: 'failed',
        progress: 100,
        createdAt: '2023-10-29T12:30:00Z',
        finishedAt: '2023-10-29T12:31:00Z',
        errorMessage: 'Image quality too low for OCR.',
    },
    {
        id: 'job-3',
        documentId: 'doc-1',
        type: 'ocr',
        status: 'completed',
        progress: 100,
        createdAt: '2023-10-28T14:00:00Z',
        finishedAt: '2023-10-28T14:02:00Z',
        errorMessage: null,
    },
    {
        id: 'job-4',
        documentId: 'doc-2',
        type: 'ocr',
        status: 'completed',
        progress: 100,
        createdAt: '2023-10-27T09:15:00Z',
        finishedAt: '2023-10-27T09:16:00Z',
        errorMessage: null,
    },
]
