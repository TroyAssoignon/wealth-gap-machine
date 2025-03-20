
import React from 'react';
import { formatCurrency, formatPercentage, investmentOptions } from '@/utils/calculatorUtils';

interface ReportGeneratorProps {
  investmentAmount: number;
  currentInvestmentId: string;
  timeframe: number;
  yearlyData: Array<{ year: number; current: number; hearthfire: number; gap: number }>;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({
  investmentAmount,
  currentInvestmentId,
  timeframe,
  yearlyData
}) => {
  // Get current date for the report
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get investment data
  const currentInvestment = investmentOptions.find(opt => opt.id === currentInvestmentId)!;
  const hearthfireInvestment = investmentOptions.find(opt => opt.id === 'hearthfire')!;
  
  // Final values
  const finalCurrent = yearlyData[yearlyData.length - 1].current;
  const finalHearthfire = yearlyData[yearlyData.length - 1].hearthfire;
  const totalGap = finalHearthfire - finalCurrent;
  
  // Create a downloadable HTML report
  const generateHTMLReport = () => {
    const reportHTML = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your Self-Storage Wealth Report</title>
        <style>
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.5;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .header h1 {
            color: #C8102E;
            margin-bottom: 5px;
          }
          .header p {
            color: #666;
            margin-top: 0;
          }
          .report-date {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
          }
          .section {
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .section h2 {
            color: #333;
            margin-bottom: 15px;
          }
          .comparison-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }
          .comparison-table th, .comparison-table td {
            padding: 12px 15px;
            text-align: left;
            border-bottom: 1px solid #eee;
          }
          .comparison-table th {
            background-color: #f8f8f8;
            font-weight: 600;
          }
          .wealth-gap {
            color: #C8102E;
            font-weight: bold;
          }
          .benefits-list {
            padding-left: 20px;
          }
          .benefits-list li {
            margin-bottom: 10px;
          }
          .call-to-action {
            background-color: #f8f8f8;
            padding: 20px;
            border-radius: 8px;
            margin-top: 30px;
          }
          .call-to-action h3 {
            margin-top: 0;
            color: #C8102E;
          }
          .disclaimers {
            font-size: 12px;
            color: #999;
            margin-top: 40px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Your Self-Storage Wealth Report</h1>
          <p>A personalized analysis of your investment potential</p>
          <div class="report-date">Generated on ${currentDate}</div>
        </div>
        
        <div class="section">
          <h2>Your Investment Summary</h2>
          <p>Based on your input of <strong>${formatCurrency(investmentAmount)}</strong> invested over <strong>${timeframe} years</strong>, here's how your wealth could grow:</p>
          
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Investment Path</th>
                <th>Annual Return</th>
                <th>Final Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${currentInvestment.name}</td>
                <td>${formatPercentage(currentInvestment.returnRate)}</td>
                <td>${formatCurrency(finalCurrent)}</td>
              </tr>
              <tr>
                <td>${hearthfireInvestment.name}</td>
                <td>${formatPercentage(hearthfireInvestment.returnRate)}</td>
                <td>${formatCurrency(finalHearthfire)}</td>
              </tr>
              <tr>
                <td colspan="2"><strong>Your Wealth Gap (Money Left on the Table)</strong></td>
                <td class="wealth-gap">${formatCurrency(totalGap)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="section">
          <h2>Why Self-Storage Outperforms</h2>
          <p>The Hearthfire Self-Storage Fund offers several advantages over traditional investment vehicles:</p>
          
          <ul class="benefits-list">
            <li><strong>Recession Resistance:</strong> Self-storage has historically performed well during economic downturns, providing stability when other investments falter.</li>
            <li><strong>Higher Returns:</strong> With targeted annual returns of ${formatPercentage(hearthfireInvestment.returnRate)}, self-storage significantly outperforms most traditional investment options.</li>
            <li><strong>Tax Advantages:</strong> Real estate investments like self-storage offer depreciation benefits that can significantly reduce your tax liability.</li>
            <li><strong>Passive Income Potential:</strong> Generate consistent monthly cash flow without active involvement in property management.</li>
            <li><strong>Professional Management:</strong> Benefit from expert teams handling all aspects of acquisition, operation, and optimization.</li>
          </ul>
        </div>
        
        <div class="section">
          <h2>Year-by-Year Growth Projection</h2>
          <table class="comparison-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>${currentInvestment.name}</th>
                <th>Hearthfire Fund</th>
                <th>Annual Gap</th>
              </tr>
            </thead>
            <tbody>
              ${yearlyData.map(year => `
                <tr>
                  <td>${year.year}</td>
                  <td>${formatCurrency(year.current)}</td>
                  <td>${formatCurrency(year.hearthfire)}</td>
                  <td class="wealth-gap">${formatCurrency(year.gap)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        
        <div class="call-to-action">
          <h3>Ready to Close Your Wealth Gap?</h3>
          <p>Schedule a no-obligation investor call to learn how you can start building wealth with Hearthfire's Self-Storage Fund.</p>
          <p>Contact us at <strong>invest@hearthfire.com</strong> or call <strong>(555) 123-4567</strong></p>
        </div>
        
        <div class="disclaimers">
          <p>Disclaimer: This report is for illustrative purposes only. Past performance is no guarantee of future results. Investment involves risk, including the loss of principal. Please consult with a financial advisor before making any investment decisions.</p>
        </div>
      </body>
      </html>
    `;
    
    return reportHTML;
  };
  
  // Generate and download the report
  const downloadReport = () => {
    const reportHTML = generateHTMLReport();
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Self-Storage-Wealth-Report.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return { downloadReport };
};

export default ReportGenerator;
