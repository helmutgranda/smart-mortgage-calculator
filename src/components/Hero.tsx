import { Home, TrendingDown, Calculator as CalcIcon } from 'lucide-react';
import heroImage from 'figma:asset/3efbb2bc303d8ebf03eb92f5fa029ff3042b9d39.png';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-teal-600 text-white">
      <div 
        className="absolute inset-0 bg-cover opacity-90 bg-bottom"
        style={{ backgroundImage: `url(${heroImage})`, backgroundPosition: 'bottom', opacity: 0.2 }}
      />
      <div className="absolute inset-0 " />
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl">
              <Home className="w-10 h-10" />
            </div>
          </div>
          <h1 className="mb-4">
            Smart Mortgage Calculator
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-6">
            See your mortgage breakdown in real-time. Adjust your loan parameters and instantly visualize your monthly payments, total interest, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <CalcIcon className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-sm text-blue-100">Real-time</div>
                <div>Calculations</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <TrendingDown className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-sm text-blue-100">Visual</div>
                <div>Breakdown</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}