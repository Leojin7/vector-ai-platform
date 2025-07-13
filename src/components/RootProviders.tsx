// src/components/RootProviders.tsx
'use client';

import { ToastProvider } from '@/components/ui/useToast';
import Toaster from '@/components/ui/Toaster';

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      {children}
      <Toaster />   {/* must be inside the provider */}
    </ToastProvider>
  );
}
