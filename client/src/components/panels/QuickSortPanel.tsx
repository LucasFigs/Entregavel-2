import { useState } from 'react';
import { quickSort as jsQuickSort } from '@/lib/algorithms/javascript';
import { apiRequest } from '@/lib/api';

export default function QuickSortPanel() {
  const [language, setLanguage] = useState<'javascript' | 'java'>('javascript');
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [codeString, setCodeString] = useState<string>(
    `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`
  );

  const handleLanguageChange = (newLanguage: 'javascript' | 'java') => {
    setLanguage(newLanguage);
    if (newLanguage === 'java') {
      setCodeString(
        `public static void quickSort(int[] arr, int low, int high) {
  if (low < high) {
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
}

private static int partition(int[] arr, int low, int high) {
  int pivot = arr[high];
  int i = low - 1;
  
  for (int j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  
  int temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  
  return i + 1;
}`
      );
    } else {
      setCodeString(
        `function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
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
      
      const numbers = input.split(',').map(num => parseInt(num.trim()));
      
      if (numbers.some(isNaN)) {
        setResult('Invalid input: please enter numbers separated by commas');
        return;
      }
      
      if (language === 'javascript') {
        const originalArray = [...numbers];
        const sortedArray = jsQuickSort([...numbers]);
        setResult(`Original array: [${originalArray.join(', ')}]\nSorted array: [${sortedArray.join(', ')}]`);
      } else {
        // Call the server for Java implementation
        const response = await apiRequest('POST', '/api/algorithms/quicksort', { numbers });
        const data = await response.json();
        setResult(`Original array: [${numbers.join(', ')}]\nSorted array: [${data.result.join(', ')}]`);
      }
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="quicksort-panel">
      <h2 className="text-xl font-medium mb-4">QuickSort Algorithm</h2>
      <p className="mb-4">Sorts an array of numbers using the QuickSort algorithm, which is a divide-and-conquer algorithm with an average time complexity of O(n log n).</p>
      
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
        <label htmlFor="quicksort-input" className="block mb-2 font-medium">Enter numbers to sort (comma-separated):</label>
        <div className="flex">
          <input
            type="text"
            id="quicksort-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-2 border border-neutral-light rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g. 9,5,1,8,3,10,4"
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
          <div className="code-block font-mono whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
}
