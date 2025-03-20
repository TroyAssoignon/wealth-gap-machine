
import React from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  ChevronRight,
  DollarSign,
  PiggyBank,
  BarChart,
  Clock,
  TrendingUp
} from 'lucide-react';
import { investmentOptions, timeframeOptions } from '@/utils/calculatorUtils';

interface InvestmentFormProps {
  investmentAmount: number;
  selectedInvestmentId: string;
  selectedTimeframe: number;
  onInvestmentAmountChange: (amount: number) => void;
  onInvestmentChange: (id: string) => void;
  onTimeframeChange: (years: number) => void;
  onCalculate: () => void;
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({
  investmentAmount,
  selectedInvestmentId,
  selectedTimeframe,
  onInvestmentAmountChange,
  onInvestmentChange,
  onTimeframeChange,
  onCalculate
}) => {
  // Format the investment amount as a currency while user is typing
  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-numeric characters
    const value = e.target.value.replace(/[^0-9]/g, '');
    onInvestmentAmountChange(parseInt(value) || 0);
  };

  return (
    <Card className="w-full overflow-hidden animate-fade-in-up">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-2">
              Step 1
            </div>
            <h3 className="text-2xl font-semibold leading-tight">Your Current Situation</h3>
            <p className="text-muted-foreground">Tell us about your current investment strategy</p>
          </div>
          
          <div className="space-y-4">
            {/* Investment Amount */}
            <div className="space-y-2">
              <Label htmlFor="investmentAmount" className="text-sm font-medium flex items-center gap-1.5">
                <DollarSign className="w-4 h-4" /> 
                Your Available Investment Capital
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="investmentAmount"
                  className="pl-8 h-12 text-lg font-medium number-formatter"
                  value={investmentAmount ? investmentAmount.toLocaleString() : ''}
                  onChange={handleAmountInputChange}
                  placeholder="50,000"
                />
              </div>
            </div>
            
            {/* Current Investment */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <PiggyBank className="w-4 h-4" /> 
                What You're Currently Doing With This Money
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {investmentOptions.filter(option => option.id !== 'hearthfire').map((option) => (
                  <div
                    key={option.id}
                    className={`investment-option ${selectedInvestmentId === option.id ? 'selected' : ''}`}
                    onClick={() => onInvestmentChange(option.id)}
                  >
                    <div className={`w-2 h-2 rounded-full ${selectedInvestmentId === option.id ? 'bg-primary' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{option.name}</div>
                      <div className="text-xs text-muted-foreground">{option.returnRate * 100}% annual return</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Investment Timeframe */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> 
                How Long You Plan To Keep It Invested
              </Label>
              <div className="flex flex-wrap gap-2">
                {timeframeOptions.map((years) => (
                  <Button
                    key={years}
                    type="button"
                    variant={selectedTimeframe === years ? "default" : "outline"}
                    className="flex-1 min-w-[80px]"
                    onClick={() => onTimeframeChange(years)}
                  >
                    {years} {years === 1 ? 'Year' : 'Years'}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <Button 
            onClick={onCalculate} 
            className="w-full bg-wealth hover:bg-wealth-dark text-white"
            size="lg"
            disabled={!investmentAmount || investmentAmount < 1000}
          >
            See The Wealth Gap <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InvestmentForm;
