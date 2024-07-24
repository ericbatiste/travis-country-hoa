import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full">
      <Loader2 className="animate-spin text-blue-600" size={100} />
    </div>
  );
}
