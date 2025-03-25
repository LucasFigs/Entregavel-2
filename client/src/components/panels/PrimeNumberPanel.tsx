import { useState } from 'react';
import { isPrime as jsPrime } from '@/lib/algorithms/javascript';
import { apiRequest } from '@/lib/api';

export default function PrimeNumberPanel() {
  const [language, setLanguage] = useState<'javascript' | 'java'>('javascript');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeString, setCodeString] = useState<string>(
    `function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
}`
  );

  const handleLanguageChange = (newLanguage: 'javascript' | 'java') => {
    setLanguage(newLanguage);
    if (newLanguage === 'java') {
      setCodeString(
        `public static boolean isPrime(int num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 == 0 || num % 3 == 0) return false;
  
  for (int i = 5; i * i <= num; i += 6) {
    if (num % i == 0 || num % (i + 2) == 0) return false;
  }
  
  return true;
}`
      );
    } else {
      setCodeString(
        `function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
}`
      );
    }
  };

  const handleExecute = async () => {
    try {
      setIsLoading(true);
      const number = parseInt(input);
      
      if (isNaN(number)) {
        setResult('Please enter a valid number');
        return;
      }
      
      if (language === 'javascript') {
        const isPrimeResult = jsPrime(number);
        setResult(`${number} ${isPrimeResult ? 'is' : 'is not'} a prime number.`);
      } else {
        // Call the server for Java implementation
        const response = await apiRequest('POST', '/api/algorithms/prime', { number });
        const data = await response.json();
        setResult(`${number} ${data.result ? 'is' : 'is not'} a prime number.`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="prime-panel">
      <h2 className="text-xl font-medium mb-4">Prime Number Checker</h2>
      <p className="mb-4">A prime number is a natural number greater than 1 that is not a product of two smaller natural numbers.</p>
      
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
        <label htmlFor="prime-input" className="block mb-2 font-medium">Enter a number to check:</label>
        <div className="flex">
          <input
            type="number"
            id="prime-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border border-neutral-light rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. 17"
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
