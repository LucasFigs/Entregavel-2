import { useState } from 'react';
import { countInRange as jsCountInRange } from '@/lib/algorithms/javascript';
import { apiRequest } from '@/lib/api';

export default function CountPanel() {
  const [language, setLanguage] = useState<'javascript' | 'java'>('javascript');
  const [dataInput, setDataInput] = useState<string>('');
  const [nInput, setNInput] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeString, setCodeString] = useState<string>(
    `function countInRange(data, n) {
  if (data.length === 0) return 0;
  
  const first = data[0];
  let count = 0;
  
  for (const num of data) {
    if (Number.isInteger(num) && num >= first && num <= n) {
      count++;
    }
  }
  
  return count;
}`
  );

  const handleLanguageChange = (newLanguage: 'javascript' | 'java') => {
    setLanguage(newLanguage);
    if (newLanguage === 'java') {
      setCodeString(
        `public static int countInRange(int[] data, int n) {
  if (data.length == 0) return 0;
  
  int first = data[0];
  int count = 0;
  
  for (int num : data) {
    if (num >= first && num <= n) {
      count++;
    }
  }
  
  return count;
}`
      );
    } else {
      setCodeString(
        `function countInRange(data, n) {
  if (data.length === 0) return 0;
  
  const first = data[0];
  let count = 0;
  
  for (const num of data) {
    if (Number.isInteger(num) && num >= first && num <= n) {
      count++;
    }
  }
  
  return count;
}`
      );
    }
  };

  const handleExecute = async () => {
    try {
      setIsLoading(true);
      
      if (!dataInput.trim()) {
        setResult('Please enter numbers separated by commas');
        return;
      }
      
      const data = dataInput.split(',').map(num => parseInt(num.trim()));
      const n = parseInt(nInput);
      
      if (data.some(isNaN) || isNaN(n)) {
        setResult('Invalid input: please enter valid integers');
        return;
      }
      
      if (language === 'javascript') {
        const count = jsCountInRange(data, n);
        setResult(`In the data set [${data.join(', ')}], there are ${count} integers between ${data[0]} and ${n} (inclusive).`);
      } else {
        // Call the server for Java implementation
        const response = await apiRequest('POST', '/api/algorithms/count', { data, n });
        const responseData = await response.json();
        setResult(`In the data set [${data.join(', ')}], there are ${responseData.result} integers between ${data[0]} and ${n} (inclusive).`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="count-panel">
      <h2 className="text-xl font-medium mb-4">Count Integers in Range</h2>
      <p className="mb-4">Counts how many integers exist in a data set between the first value (inclusive) and N (inclusive).</p>
      
      {/* Language Toggle */}
      <div className="flex mb-6 bg-neutral-lightest rounded-md inline-block">
        <button
          className={`px-4 py-2 ${language === 'javascript' ? 'bg-primary text-white' : ''} rounded-l-md`}
          onClick={() => handleLanguageChange('javascript')}
        >
          JavaScript
        </button>
        <button
          className={`px-4 py-2 ${language === 'java' ? 'bg-primary text-white' : ''} rounded-r-md`}
          onClick={() => handleLanguageChange('java')}
        >
          Java
        </button>
      </div>
      
      {/* Input Form */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="count-data" className="block mb-2 font-medium">Enter data set (comma-separated):</label>
            <input
              type="text"
              id="count-data"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. 5,10,15,20,25"
            />
          </div>
          <div>
            <label htmlFor="count-n" className="block mb-2 font-medium">Enter N (upper limit):</label>
            <input
              type="number"
              id="count-n"
              value={nInput}
              onChange={(e) => setNInput(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. 20"
            />
          </div>
        </div>
        <button
          onClick={handleExecute}
          disabled={isLoading}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors flex items-center"
        >
          {isLoading ? (
            <>
              <span className="material-icons mr-1 animate-spin">refresh</span>
              Loading...
            </>
          ) : (
            <>
              <span className="material-icons mr-1">play_arrow</span>
              Execute
            </>
          )}
        </button>
        <p className="text-sm text-neutral-medium mt-2">Enter integers for the data set and the upper limit N.</p>
      </div>
      
      {/* Code Display */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Implementation:</h3>
        <div className="code-block bg-neutral-lightest p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
          {codeString}
        </div>
      </div>
      
      {/* Results Container */}
      {result && (
        <div className="result-container show bg-neutral-lightest rounded-md p-4 mb-4">
          <h3 className="font-medium mb-2">Result:</h3>
          <div className="code-block font-mono">{result}</div>
        </div>
      )}
    </div>
  );
}
