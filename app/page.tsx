'use client';

import {
  useEffect,
  useState,
} from 'react';

import accountingData from './data/data.json';
import {
  AccountingData,
  FormattedMetrics,
} from './types/accounting';
import { AccountingCalculator } from './utils/calculations';

export default function Home() {
    const [metrics, setMetrics] = useState<FormattedMetrics | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        try {
            const typedData = accountingData as AccountingData;
            const calculator = new AccountingCalculator(typedData.data);
            const calculatedMetrics = calculator.calculateMetrics();
            const formattedMetrics = calculator.formatMetrics(calculatedMetrics);
            setMetrics(formattedMetrics);
        } catch (err) {
            setError('Error processing data');
            console.error(err);
        }
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
            <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Financial Metrics
                        </h1>
                        
                        {error && (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                                {error}
                            </div>
                        )}

                        {!metrics && !error && (
                            <div className="text-gray-500 text-center py-4">
                                Calculating metrics...
                            </div>
                        )}

                        {metrics && (
                            <dl className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <dt className="text-gray-600 font-medium">Revenue</dt>
                                    <dd className="text-gray-900 font-semibold">{metrics.revenue}</dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-gray-600 font-medium">Expenses</dt>
                                    <dd className="text-gray-900 font-semibold">{metrics.expenses}</dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-gray-600 font-medium">Gross Profit Margin</dt>
                                    <dd className="text-gray-900 font-semibold">{metrics.grossProfitMargin}</dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-gray-600 font-medium">Net Profit Margin</dt>
                                    <dd className="text-gray-900 font-semibold">{metrics.netProfitMargin}</dd>
                                </div>
                                <div className="flex justify-between items-center">
                                    <dt className="text-gray-600 font-medium">Working Capital Ratio</dt>
                                    <dd className="text-gray-900 font-semibold">{metrics.workingCapitalRatio}</dd>
                                </div>
                            </dl>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}