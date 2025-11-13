import { AdminTabs } from './components/admin-tabs';

export default function AdminPage() {
    return (
        <div>
            <div className="flex items-center mb-6">
                <h1 className="text-lg font-semibold md:text-2xl font-headline">Admin Dashboard</h1>
            </div>
            <AdminTabs />
        </div>
    )
}
