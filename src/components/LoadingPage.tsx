import { Loader2 } from 'lucide-react';

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-full">
      <Loader2 className="animate-spin text-green" size={100} />
    </div>
  );
}
