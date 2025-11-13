import { DocumentList } from "./components/document-list";
import { DocumentUploader } from "./components/document-uploader";

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">My Documents</h1>
      </div>
      <div className="flex flex-col gap-8">
        <DocumentUploader />
        <DocumentList />
      </div>
    </>
  );
}
