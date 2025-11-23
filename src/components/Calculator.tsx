import { useState, useEffect } from 'react';
import { DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export function Calculator() {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(6);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(60000); // 20% of 300000
  const DOWN_PAYMENT_STEP = 1000;

  const [calculations, setCalculations] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    principalAmount: 0,
    downPaymentPercent: 0,
  });

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm, downPayment]);

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    const downPaymentPercent = (downPayment / loanAmount) * 100;

    setCalculations({
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      principalAmount: principal,
      downPaymentPercent,
    });
  };

  const chartData = [
    { name: 'Principal', value: calculations.principalAmount, color: '#0ea5e9' },
    { name: 'Interest', value: calculations.totalInterest, color: calculations.totalInterest > calculations.principalAmount ? '#dc2626' : '#14b8a6' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const calculateTermComparison = (term: number) => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = term * 12;

    let monthlyPayment = 0;
    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
      loanAmount: principal,
    };
  };

  const comparisonTerms = [50, 30, 15, 10];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Calculator Input Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
          <h2 className="mb-8 text-slate-800">Loan Details</h2>
          
          <div className="space-y-6">
            {/* Home Price */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-3">
                <DollarSign className="w-5 h-5 text-blue-600" />
                Home Price
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => {
                  const newLoanAmount = Number(e.target.value);
                  const maxDown = newLoanAmount * 0.5;

                  setLoanAmount(newLoanAmount);

                  // Keep downPayment as a fixed dollar amount; only clamp if it exceeds the new max
                  if (downPayment > maxDown) {
                    setDownPayment(maxDown);
                  }
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => {
                  const newLoanAmount = Number(e.target.value);
                  const maxDown = newLoanAmount * 0.5;

                  setLoanAmount(newLoanAmount);

                  // Keep downPayment as a fixed dollar amount; only clamp if it exceeds the new max
                  if (downPayment > maxDown) {
                    setDownPayment(maxDown);
                  }
                }}
                className="w-full mt-3 accent-blue-600"
              />
            </div>

            {/* Down Payment */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-3">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                Down Payment ({calculations.downPaymentPercent.toFixed(1)}%)
              </label>
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="range"
                min="0"
                max={loanAmount * 0.5}
                step={DOWN_PAYMENT_STEP}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full mt-3 accent-teal-600"
              />
            </div>

            {/* Interest Rate */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-3">
                <Percent className="w-5 h-5 text-blue-600" />
                Interest Rate
              </label>
              <input
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="range"
                min="2"
                max="12"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full mt-3 accent-blue-600"
              />
            </div>

            {/* Loan Term */}
            <div>
              <label className="flex items-center gap-2 text-slate-700 mb-3">
                <Calendar className="w-5 h-5 text-teal-600" />
                Loan Term (years)
              </label>
              <div className="flex gap-3">
                {[50, 30, 15, 10].map((term) => (
                  <button
                    key={term}
                    onClick={() => setLoanTerm(term)}
                    className={`flex-1 py-3 rounded-lg transition-all ${
                      loanTerm === term
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {term} years
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="space-y-6">
          {/* Monthly Payment - Large Display */}
          <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-sm text-blue-100 mb-2">Monthly Payment</div>
            <div className="text-5xl mb-4">
              {formatCurrency(calculations.monthlyPayment)}
            </div>
            <div className="text-sm text-blue-100">
              for {loanTerm} years ({loanTerm * 12} payments)
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Loan Amount</div>
              <div className="text-2xl text-slate-800">
                {formatCurrency(calculations.principalAmount)}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Down Payment</div>
              <div className="text-2xl text-slate-800">
                {formatCurrency(downPayment)}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Total Interest</div>
              <div className={`text-2xl ${calculations.totalInterest > calculations.principalAmount ? 'text-red-600' : 'text-teal-600'}`}>
                {formatCurrency(calculations.totalInterest)}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200">
              <div className="text-sm text-slate-600 mb-2">Total Payment</div>
              <div className="text-2xl text-blue-600">
                {formatCurrency(calculations.totalPayment)}
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <h3 className="mb-6 text-slate-800">Payment Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center">
                <div className="w-4 h-4 bg-sky-500 rounded mx-auto mb-2" />
                <div className="text-sm text-slate-600">Principal</div>
                <div className="text-slate-800">{formatCurrency(calculations.principalAmount)}</div>
              </div>
              <div className="text-center">
                <div className={`w-4 h-4 rounded mx-auto mb-2 ${calculations.totalInterest > calculations.principalAmount ? 'bg-red-600' : 'bg-teal-500'}`} />
                <div className="text-sm text-slate-600">Interest</div>
                <div className="text-slate-800">{formatCurrency(calculations.totalInterest)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Term Comparison Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-slate-800">Compare Loan Terms</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comparisonTerms.map((term) => {
            const termCalc = calculateTermComparison(term);
            const isSelected = loanTerm === term;
            
            return (
              <button
                key={term}
                onClick={() => setLoanTerm(term)}
                className={`bg-white rounded-xl p-6 text-left transition-all hover:scale-105 ${
                  isSelected
                    ? 'border-2 border-blue-600 shadow-lg'
                    : 'border border-slate-200 shadow-md hover:border-blue-300'
                }`}
              >
                <div className="mb-4">
                  <div className={`text-3xl ${isSelected ? 'text-slate-800' : 'text-slate-700'}`}>
                    {term}
                  </div>
                  <div className="text-sm text-slate-500">year fixed</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Monthly</div>
                    <div className="text-2xl text-blue-600">
                      {formatCurrency(termCalc.monthlyPayment)}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Loan Amount</div>
                    <div className="text-slate-800">
                      {formatCurrency(termCalc.loanAmount)}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Total Interest</div>
                    <div className={termCalc.totalInterest > termCalc.loanAmount ? 'text-red-600' : 'text-slate-800'}>
                      {formatCurrency(termCalc.totalInterest)}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200">
                    <div className="text-sm text-slate-600 mb-1">Total Paid</div>
                    <div className="text-slate-800">
                      {formatCurrency(termCalc.totalPayment)}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}