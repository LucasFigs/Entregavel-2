import { useState } from 'react';
import { gcd as jsGcd } from '@/lib/algorithms/javascript';
import { apiRequest } from '@/lib/api';

export default function GCDPanel() {
  const [language, setLanguage] = useState<'javascript' | 'java'>('javascript');
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeString, setCodeString] = useState<string>(
    `function gcd(a, b) {
  // Euclidean algorithm
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}`
  );

  const handleLanguageChange = (newLanguage: 'javascript' | 'java') => {
    setLanguage(newLanguage);
    if (newLanguage === 'java') {
      setCodeString(
        `public static int gcd(int a, int b) {
  while (b != 0) {
    int temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}`
      );
    } else {
      setCodeString(
        `function gcd(a, b) {
  // Euclidean algorithm
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}`
      );
    }
  };

  const handleExecute = async () => {
    try {
      setIsLoading(true);
      
      const a = parseInt(input1);
      const b = parseInt(input2);
      
      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        setResult('Please enter two positive integers');
        return;
      }
      
      if (language === 'javascript') {
        const result = jsGcd(a, b);
        setResult(`GCD of ${a} and ${b} = ${result}`);
      } else {
        // Call the server for Java implementation
        const response = await apiRequest('POST', '/api/algorithms/gcd', { a, b });
        const data = await response.json();
        setResult(`GCD of ${a} and ${b} = ${data.result}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="gcd-panel">
      <h2 className="text-xl font-medium mb-4">Greatest Common Divisor (GCD)</h2>
      <p className="mb-4">Calculates the largest positive integer that divides each of the given integers without a remainder.</p>
      
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
            <label htmlFor="gcd-input1" className="block mb-2 font-medium">First Number:</label>
            <input
              type="number"
              id="gcd-input1"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. 48"
            />
          </div>
          <div>
            <label htmlFor="gcd-input2" className="block mb-2 font-medium">Second Number:</label>
            <input
              type="number"
              id="gcd-input2"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-light rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. 18"
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
        <p className="text-sm text-neutral-medium mt-2">Enter two positive integers.</p>
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
