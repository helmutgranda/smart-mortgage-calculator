import { AlertCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start gap-3 text-slate-600 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-slate-400" />
          <p>
            <strong>Note:</strong> Figures are estimates for illustrative purposes only and do not include taxes, insurance, or HOA fees. This is not an offer to lend.
          </p>
        </div>
      </div>
    </footer>
  );
}
