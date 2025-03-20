
// Investment options with their expected annual returns
export const investmentOptions = [
  { id: 'bank', name: 'Savings Account', returnRate: 0.01, risk: 'Very Low', note: 'Not keeping up with inflation' },
  { id: 'cd', name: 'Certificate of Deposit', returnRate: 0.03, risk: 'Low', note: 'Barely keeping up with inflation' },
  { id: 'bonds', name: 'Corporate Bonds', returnRate: 0.05, risk: 'Low-Medium', note: 'Fixed income with limited upside' },
  { id: 'sp500', name: 'S&P 500 Index', returnRate: 0.07, risk: 'Medium', note: 'Volatile with recession risks' },
  { id: 'reits', name: 'Traditional REITs', returnRate: 0.09, risk: 'Medium-High', note: 'Susceptible to market downturns' },
  { id: 'hearthfire', name: 'Hearthfire Self-Storage Fund', returnRate: 0.16, risk: 'Medium', note: 'Recession-resistant, high-yield' }
];

// Timeframe options in years
export const timeframeOptions = [3, 5, 10, 15, 20];

// Calculate compound returns over time
export const calculateCompoundReturns = (
  principal: number,
  annualReturnRate: number,
  years: number
): number => {
  return principal * Math.pow(1 + annualReturnRate, years);
};

// Format currency for display
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format percentage for display
export const formatPercentage = (percentage: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(percentage);
};

// Generate yearly comparison data for charts
export const generateYearlyComparisonData = (
  principal: number,
  currentReturnRate: number,
  hearthfireReturnRate: number,
  years: number
): Array<{ year: number; current: number; hearthfire: number; gap: number }> => {
  const data = [];
  
  for (let year = 0; year <= years; year++) {
    const current = calculateCompoundReturns(principal, currentReturnRate, year);
    const hearthfire = calculateCompoundReturns(principal, hearthfireReturnRate, year);
    
    data.push({
      year,
      current,
      hearthfire,
      gap: hearthfire - current,
    });
  }
  
  return data;
};

// Calculate annual income from investment (for passive income estimation)
export const calculateAnnualIncome = (principal: number, annualReturnRate: number): number => {
  return principal * annualReturnRate;
};

// Calculate tax advantages (simplified estimation)
export const calculateTaxAdvantage = (principal: number): number => {
  // Simplified calculation - assume 25% tax advantage on the 1st year investment through depreciation
  return principal * 0.25;
};
