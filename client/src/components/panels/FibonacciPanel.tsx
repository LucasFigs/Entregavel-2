import { useState } from 'react';
import { fibonacci as jsFibonacci } from '@/lib/algorithms/javascript';
import { apiRequest } from '@/lib/api';

export default function FibonacciPanel() {
  const [language, setLanguage] = useState<'javascript' | 'java'>('javascript');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeString, setCodeString] = useState<string>(
    `function fibonacci(n) {
  const sequence = [0, 1];
  
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i-1] + sequence[i-2];
  }
  
  return sequence.slice(0, n);
}`
  );

  const handleLanguageChange = (newLanguage: 'javascript' | 'java') => {
    setLanguage(newLanguage);
    if (newLanguage === 'java') {
      setCodeString(
        `public static int[] fibonacci(int n) {
  int[] sequence = new int[n];
  if (n > 0) sequence[0] = 0;
  if (n > 1) sequence[1] = 1;
  
  for (int i = 2; i < n; i++) {
    sequence[i] = sequence[i-1] + sequence[i-2];
  }
  
  return sequence;
}`
      );
    } else {
      setCodeString(
        `function fibonacci(n) {
  const sequence = [0, 1];
  
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i-1] + sequence[i-2];
  }
  
  return sequence.slice(0, n);
}`
      );
    }
  };

  const handleExecute = async () => {
    try {
      setIsLoading(true);
      
      const n = parseInt(input);
      
      if (isNaN(n) || n <= 0) {
        setResult('Please enter a positive integer greater than 0');
        return;
      }
      
      if (language === 'javascript') {
        const sequence = jsFibonacci(n);
        setResult(`Fibonacci sequence (${n} terms): ${sequence.join(', ')}`);
      } else {
        // Call the server for Java implementation
        const response = await apiRequest('POST', '/api/algorithms/fibonacci', { n });
        const data = await response.json();
        setResult(`Fibonacci sequence (${n} terms): ${data.result.join(', ')}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="fibonacci-panel">
      <h2 className="text-xl font-medium mb-4">Fibonacci Sequence</h2>
      <p className="mb-4">Generates the Fibonacci sequence up to a specified term. The sequence starts with 0, 1, and each subsequent number is the sum of the two preceding ones.</p>
      
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
        <label htmlFor="fibonacci-input" className="block mb-2 font-medium">Enter the number of terms:</label>
        <div className="flex">
          <input
            type="number"
            id="fibonacci-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border border-neutral-light rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. 10"
          />
          <button
            onClick={handleExecute}
            disabled={isLoading}
            className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary-dark transition-colors flex items-center"
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
        </div>
        <p className="text-sm text-neutral-medium mt-2">Enter a positive integer greater than 1.</p>
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
