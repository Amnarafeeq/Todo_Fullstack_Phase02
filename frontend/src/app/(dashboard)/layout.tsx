import { ReactNode } from 'react';
import { Providers } from '../providers';

// Layout for authenticated routes that need providers
export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <Providers>
      <main className="flex-1">
        {children}
      </main>
    </Providers>
  );
}