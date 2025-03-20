
import React, { useState } from 'react';
import InvestmentForm from './InvestmentForm';
import ComparisonResult from './ComparisonResult';
import ReportGenerator from './ReportGenerator';
import { 
  investmentOptions, 
  generateYearlyComparisonData 
} from '@/utils/calculatorUtils';
import { toast } from '@/hooks/use-toast';

const WealthCalculator: React.FC = () => {
  // Form state
  const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<string>('sp500');
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(10);
  
  // Results state
  const [showResults, setShowResults] = useState<boolean>(false);
  const [yearlyData, setYearlyData] = useState<
    Array<{ year: number; current: number; hearthfire: number; gap: number }>
  >([]);
  
  // Handle calculation
  const handleCalculate = () => {
    // Get return rates
    const currentInvestment = investmentOptions.find(opt => opt.id === selectedInvestmentId)!;
    const hearthfireInvestment = investmentOptions.find(opt => opt.id === 'hearthfire')!;
    
    // Generate yearly data
    const data = generateYearlyComparisonData(
      investmentAmount,
      currentInvestment.returnRate,
      hearthfireInvestment.returnRate,
      selectedTimeframe
    );
    
    setYearlyData(data);
    setShowResults(true);
    
    // Scroll to top of results
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  // Handle reset
  const handleReset = () => {
    setShowResults(false);
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Handle report download
  const handleDownloadReport = () => {
    const { downloadReport } = ReportGenerator({
      investmentAmount,
      currentInvestmentId: selectedInvestmentId,
      timeframe: selectedTimeframe,
      yearlyData
    });
    
    downloadReport();
    
    toast({
      title: "Wealth Report Downloaded",
      description: "Your personalized wealth report has been downloaded.",
      variant: "default",
    });
  };
  
  return (
    <div className="w-full max-w-4xl mx-auto">
      {!showResults ? (
        <InvestmentForm
          investmentAmount={investmentAmount}
          selectedInvestmentId={selectedInvestmentId}
          selectedTimeframe={selectedTimeframe}
          onInvestmentAmountChange={setInvestmentAmount}
          onInvestmentChange={setSelectedInvestmentId}
          onTimeframeChange={setSelectedTimeframe}
          onCalculate={handleCalculate}
        />
      ) : (
        <ComparisonResult
          investmentAmount={investmentAmount}
          currentInvestmentId={selectedInvestmentId}
          hearthfireInvestmentId="hearthfire"
          timeframe={selectedTimeframe}
          yearlyData={yearlyData}
          onReset={handleReset}
          onDownloadReport={handleDownloadReport}
        />
      )}
    </div>
  );
};

export default WealthCalculator;
