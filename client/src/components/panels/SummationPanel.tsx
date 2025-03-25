import { useState } from 'react';
import { summation as jsSummation } from '@/lib/algorithms/javascript';
import { apiRequest } from '@/lib/api';

export default function SummationPanel() {
  const [language, setLanguage] = useState<'javascript' | 'java'>('javascript');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeString, setCodeString] = useState<string>(
    `function summation(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}`
  );

  const handleLanguageChange = (newLanguage: 'javascript' | 'java') => {
    setLanguage(newLanguage);
    if (newLanguage === 'java') {
      setCodeString(
        `public static double summation(double[] numbers) {
  double sum = 0;
  for (double number : numbers) {
    sum += number;
  }
  return sum;
}`
      );
    } else {
      setCodeString(
        `function summation(numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}`
      );
    }
  };

  const handleExecute = async () => {
    try {
      setIsLoading(true);
      
      if (!input.trim()) {
        setResult('Please enter numbers separated by commas');
        return;
      }
      
      const numbers = input.split(',').map(num => parseFloat(num.trim()));
      
      if (numbers.some(isNaN)) {
        setResult('Invalid input: please enter numbers separated by commas');
        return;
      }
      
      if (language === 'javascript') {
        const sum = jsSummation(numbers);
        setResult(`Sum of [${numbers.join(', ')}] = ${sum}`);
      } else {
        // Call the server for Java implementation
        const response = await apiRequest('POST', '/api/algorithms/summation', { numbers });
        const data = await response.json();
        setResult(`Sum of [${numbers.join(', ')}] = ${data.result}`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="summation-panel">
      <h2 className="text-xl font-medium mb-4">Summation</h2>
      <p className="mb-4">Calculates the sum of a set of numbers.</p>
      
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
        <label htmlFor="summation-input" className="block mb-2 font-medium">Enter numbers separated by commas:</label>
        <div className="flex">
          <input
            type="text"
            id="summation-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border border-neutral-light rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. 1,2,3,4,5"
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
        <p className="text-sm text-neutral-medium mt-2">Enter integers or decimal numbers separated by commas.</p>
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
