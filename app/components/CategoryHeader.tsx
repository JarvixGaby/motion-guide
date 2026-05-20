import { Hourglass } from 'lucide-react';

export function CategoryHeader() {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-stone-200 bg-white p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
        <Hourglass className="h-6 w-6 text-orange-600" />
      </div>
      <div>
        <h2 className="font-display text-xl font-bold text-stone-900">
          Waiting & Loading
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Data is loading — my page looks broken or blank
        </p>
      </div>
    </div>
  );
}
