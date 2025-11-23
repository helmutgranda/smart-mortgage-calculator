import { useState } from 'react';
import { Calculator } from './components/Calculator';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50">
      <Hero />
      <Calculator />
      <Footer />
    </div>
  );
}