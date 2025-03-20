
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WealthCalculator from '@/components/wealth-calculator/WealthCalculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <WealthCalculator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
