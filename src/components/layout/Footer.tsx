
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 md:py-8 animate-fade-in">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hearthfire Self-Storage Fund. All rights reserved.
          </div>
          <div className="text-xs text-muted-foreground">
            This calculator is for illustrative purposes only. Past performance is no guarantee of future results.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
