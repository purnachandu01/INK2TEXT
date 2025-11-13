'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { users, documents, jobs, DocumentStatus, User } from "@/lib/data";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const statusStyles: Record<DocumentStatus, string> = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const jobStatusStyles = {
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  processing: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  failed: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
};

function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export function AdminTabs() {
    return (
        <Tabs defaultValue="users">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="jobs">Jobs</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
                <Card>
                    <CardHeader>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>Manage your application's users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {users.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>User</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Created At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map(user => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={user.avatarUrl} alt="Avatar" data-ai-hint="person portrait" />
                                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid gap-0.5">
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-sm text-muted-foreground">{user.email}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge>
                                            </TableCell>
                                            <TableCell>{format(new Date(user.createdAt), 'PPpp')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center text-muted-foreground py-12">No users found.</div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="documents">
                <Card>
                    <CardHeader>
                        <CardTitle>Documents</CardTitle>
                        <CardDescription>A list of all documents uploaded by users.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         {documents.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {documents.map(doc => {
                                        const user = users.find(u => u.id === doc.userId);
                                        return (
                                            <TableRow key={doc.id}>
                                                <TableCell className="font-medium">{doc.title}</TableCell>
                                                <TableCell>{user?.name || 'Unknown'}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className={cn("border-none", statusStyles[doc.status])}>
                                                        {doc.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{format(new Date(doc.createdAt), 'PPpp')}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center text-muted-foreground py-12">No documents found.</div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="jobs">
                <Card>
                    <CardHeader>
                        <CardTitle>Job Queue</CardTitle>
                        <CardDescription>Monitor the status of background processing jobs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {jobs.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Job ID</TableHead>
                                        <TableHead>Document ID</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Progress</TableHead>
                                        <TableHead>Created At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {jobs.map(job => (
                                        <TableRow key={job.id}>
                                            <TableCell className="font-mono text-xs">{job.id}</TableCell>
                                            <TableCell className="font-mono text-xs">{job.documentId}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className={cn("border-none", jobStatusStyles[job.status])}>
                                                    {job.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={job.progress} className="h-2 w-24" />
                                                    <span>{job.progress}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{format(new Date(job.createdAt), 'PPpp')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                             <div className="text-center text-muted-foreground py-12">No jobs found.</div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
