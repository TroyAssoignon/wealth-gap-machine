
import React from 'react';
import { DollarSign, FireExtinguisher, Flame } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 md:py-8 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex items-center space-x-2">
            <Flame className="w-8 h-8 text-wealth" />
            <span className="text-xl font-bold tracking-tight">HEARTHFIRE</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
            The Self-Storage Wealth Builder
          </h1>
          
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed">
            Discover how much wealth you're leaving on the table by not investing in self-storage
          </p>
          
          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-wealth/10 text-wealth">
            The Ultimate Investor's Power Tool
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
