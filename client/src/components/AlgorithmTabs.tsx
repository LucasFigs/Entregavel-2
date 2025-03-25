import { useState } from 'react';
import PrimeNumberPanel from '@/components/panels/PrimeNumberPanel';
import SummationPanel from '@/components/panels/SummationPanel';
import FibonacciPanel from '@/components/panels/FibonacciPanel';
import GCDPanel from '@/components/panels/GCDPanel';
import QuickSortPanel from '@/components/panels/QuickSortPanel';
import CountPanel from '@/components/panels/CountPanel';

type Algorithm = 'prime' | 'summation' | 'fibonacci' | 'gcd' | 'quicksort' | 'count';

export default function AlgorithmTabs() {
  const [activeTab, setActiveTab] = useState<Algorithm>('prime');

  const tabs: { id: Algorithm; label: string; icon: string }[] = [
    { id: 'prime', label: 'Prime Number', icon: 'filter_1' },
    { id: 'summation', label: 'Summation', icon: 'filter_2' },
    { id: 'fibonacci', label: 'Fibonacci', icon: 'filter_3' },
    { id: 'gcd', label: 'GCD', icon: 'filter_4' },
    { id: 'quicksort', label: 'QuickSort', icon: 'filter_5' },
    { id: 'count', label: 'Counting', icon: 'filter_6' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md mb-8">
      <div className="overflow-x-auto">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`algorithm-tab px-4 py-3 text-center flex-shrink-0 ${
                activeTab === tab.id ? 'tab-active' : ''
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="block md:hidden material-icons">{tab.icon}</span>
              <span className="hidden md:block">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'prime' && <PrimeNumberPanel />}
        {activeTab === 'summation' && <SummationPanel />}
        {activeTab === 'fibonacci' && <FibonacciPanel />}
        {activeTab === 'gcd' && <GCDPanel />}
        {activeTab === 'quicksort' && <QuickSortPanel />}
        {activeTab === 'count' && <CountPanel />}
      </div>
    </div>
  );
}
