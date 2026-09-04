import Sidebar from '@/Components/Sidebar';

interface CRMLayoutProps {
  children: any;
}


export default function CRMLayout({ children }: CRMLayoutProps) {
    return (
        <div className="flex min-h-screen bg-slate-100">
            <Sidebar />
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}