
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Download, 
  TrendingUp, 
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
  LineChart,
  Line
} from 'recharts';
import { 
  formatCurrency, 
  formatPercentage, 
  calculateTaxAdvantage, 
  calculateAnnualIncome,
  investmentOptions
} from '@/utils/calculatorUtils';

interface ComparisonResultProps {
  investmentAmount: number;
  currentInvestmentId: string;
  hearthfireInvestmentId: string;
  timeframe: number;
  yearlyData: Array<{ year: number; current: number; hearthfire: number; gap: number }>;
  onReset: () => void;
  onDownloadReport: () => void;
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({
  investmentAmount,
  currentInvestmentId,
  hearthfireInvestmentId,
  timeframe,
  yearlyData,
  onReset,
  onDownloadReport
}) => {
  const [animateValues, setAnimateValues] = useState(false);
  
  // Get investment options data
  const currentInvestment = investmentOptions.find(opt => opt.id === currentInvestmentId)!;
  const hearthfireInvestment = investmentOptions.find(opt => opt.id === hearthfireInvestmentId)!;
  
  // Calculate final values
  const finalCurrent = yearlyData[yearlyData.length - 1].current;
  const finalHearthfire = yearlyData[yearlyData.length - 1].hearthfire;
  const totalGap = finalHearthfire - finalCurrent;
  const percentageIncrease = ((finalHearthfire / finalCurrent) - 1) * 100;
  
  // Calculate monthly passive income
  const annualCurrentIncome = calculateAnnualIncome(finalCurrent, currentInvestment.returnRate);
  const annualHearthfireIncome = calculateAnnualIncome(finalHearthfire, hearthfireInvestment.returnRate);
  const monthlyCurrentIncome = annualCurrentIncome / 12;
  const monthlyHearthfireIncome = annualHearthfireIncome / 12;
  
  // Calculate tax advantage
  const taxAdvantage = calculateTaxAdvantage(investmentAmount);
  
  // Format chart data for better display
  const formatChartTooltip = (value: number) => formatCurrency(value);
  
  // Trigger animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateValues(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Format the gap and difference numbers for more visual impact
  const ValueWithAnimation: React.FC<{ value: string; className?: string }> = ({ value, className }) => (
    <span className={`transition-opacity duration-1000 ${animateValues ? 'opacity-100' : 'opacity-0'} ${className || ''}`}>
      {value}
    </span>
  );

  return (
    <div className="space-y-6 animate-fade-in-up">
      <Card className="overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-2">
                Step 2
              </div>
              <h3 className="text-2xl font-semibold">The Brutal Truth Unfolds</h3>
              <p className="text-muted-foreground">See how much you're leaving on the table</p>
            </div>

            {/* Main comparison cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Path Card */}
              <Card className="overflow-hidden border-0 shadow-sm">
                <div className="p-6 space-y-3">
                  <Badge variant="outline" className="bg-secondary font-normal px-2.5 py-0.5">Your Current Path</Badge>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-sm">{currentInvestment.name}</div>
                    <h4 className="text-3xl font-semibold number-formatter">
                      <ValueWithAnimation value={formatCurrency(finalCurrent)} />
                    </h4>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {formatPercentage(currentInvestment.returnRate)} annually for {timeframe} years
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-sm text-muted-foreground mb-1">Monthly Passive Income</div>
                    <div className="text-lg font-medium number-formatter">
                      <ValueWithAnimation value={formatCurrency(monthlyCurrentIncome)} />
                    </div>
                  </div>
                  <div className="pt-1">
                    <div className="text-xs text-muted-foreground italic">{currentInvestment.note}</div>
                  </div>
                </div>
              </Card>

              {/* Hearthfire Path Card */}
              <Card className="overflow-hidden border-0 shadow-sm bg-wealth/5">
                <div className="p-6 space-y-3">
                  <Badge className="bg-wealth text-white font-normal px-2.5 py-0.5 border-0">The Hearthfire Path</Badge>
                  <div className="space-y-1">
                    <div className="text-muted-foreground text-sm">{hearthfireInvestment.name}</div>
                    <h4 className="text-3xl font-semibold text-wealth number-formatter">
                      <ValueWithAnimation value={formatCurrency(finalHearthfire)} />
                    </h4>
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {formatPercentage(hearthfireInvestment.returnRate)} annually for {timeframe} years
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <div className="text-sm text-muted-foreground mb-1">Monthly Passive Income</div>
                    <div className="text-lg font-medium text-wealth number-formatter">
                      <ValueWithAnimation value={formatCurrency(monthlyHearthfireIncome)} />
                    </div>
                  </div>
                  <div className="pt-1">
                    <div className="text-xs font-medium text-wealth italic">Recession-resistant, high-yield investment</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Wealth Gap Callout */}
            <div className="p-8 rounded-lg bg-wealth/10 border border-wealth/30 space-y-4">
              <div className="space-y-1">
                <Badge className="bg-wealth text-white font-medium px-3 py-1 border-0">The Wealth Gap</Badge>
                <h3 className="text-4xl font-bold text-wealth number-formatter">
                  <ValueWithAnimation value={formatCurrency(totalGap)} className="flex items-center gap-1" />
                </h3>
                <p className="text-muted-foreground">
                  That's <span className="font-medium">{Math.round(percentageIncrease)}% more money</span> by choosing Hearthfire
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <AlertTriangle className="w-4 h-4 text-wealth" />
                <span className="text-wealth-dark font-medium">You're leaving {formatCurrency(totalGap)} on the table</span>
              </div>
            </div>

            {/* Visualization */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium">Your Wealth Over Time</h4>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={yearlyData}
                    margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }} 
                    />
                    <YAxis 
                      tickFormatter={formatChartTooltip} 
                      width={80}
                    />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), '']}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="current" 
                      name={currentInvestment.name}
                      stroke="#0074D9" 
                      fill="#0074D9" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hearthfire" 
                      name="Hearthfire Fund"
                      stroke="#C8102E" 
                      fill="#C8102E" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* The Gap Visualization */}
            <div className="space-y-4">
              <h4 className="text-lg font-medium">The Growing Wealth Gap</h4>
              <div className="w-full h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={yearlyData.filter((entry, index) => index % Math.ceil(yearlyData.length / 5) === 0 || index === yearlyData.length - 1)}
                    margin={{ top: 10, right: 30, left: 30, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis tickFormatter={formatChartTooltip} width={80} />
                    <Tooltip 
                      formatter={(value: number) => [formatCurrency(value), 'Money Left on the Table']}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar 
                      dataKey="gap" 
                      name="Wealth Gap" 
                      fill="#C8102E" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Investor Reality Check */}
      <Card className="overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-full mb-2">
                Step 3
              </div>
              <h3 className="text-2xl font-semibold">The Investor Reality Check</h3>
              <p className="text-muted-foreground">Additional benefits you're missing out on</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Passive Cash Flow */}
              <Card className="overflow-hidden border-0 shadow-sm">
                <div className="p-5 space-y-3">
                  <h4 className="text-base font-medium">Missed Monthly Cash Flow</h4>
                  <div className="text-3xl font-semibold text-wealth number-formatter">
                    <ValueWithAnimation value={formatCurrency(monthlyHearthfireIncome - monthlyCurrentIncome)} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Additional monthly passive income you could be generating
                  </p>
                </div>
              </Card>

              {/* Risk-Adjusted Performance */}
              <Card className="overflow-hidden border-0 shadow-sm">
                <div className="p-5 space-y-3">
                  <h4 className="text-base font-medium">Lower Risk Exposure</h4>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-normal">{currentInvestment.risk} Risk</Badge>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Badge className="bg-wealth text-white font-normal border-0">{hearthfireInvestment.risk} Risk</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Self-storage has historically outperformed during market downturns
                  </p>
                </div>
              </Card>

              {/* Tax Efficiency */}
              <Card className="overflow-hidden border-0 shadow-sm">
                <div className="p-5 space-y-3">
                  <h4 className="text-base font-medium">Tax Advantage</h4>
                  <div className="text-3xl font-semibold text-wealth number-formatter">
                    <ValueWithAnimation value={formatCurrency(taxAdvantage)} />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Potential first-year tax savings through depreciation benefits
                  </p>
                </div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={onDownloadReport} 
                className="flex-1 bg-wealth hover:bg-wealth-dark text-white"
                size="lg"
              >
                <Download className="mr-2 w-4 h-4" /> Download Wealth Report
              </Button>
              <Button 
                onClick={onReset} 
                variant="outline"
                size="lg"
                className="flex-1"
              >
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ComparisonResult;
