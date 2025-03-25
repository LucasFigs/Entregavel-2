import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create temporary directory if it doesn't exist
const tempDir = path.join(__dirname, '..', 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

/**
 * Executes Java code with a given class name and method call
 */
function executeJava(className: string, methodCall: string, imports = ''): string {
  const javaFilePath = path.join(tempDir, `${className}.java`);
  const classFilePath = path.join(tempDir, `${className}.class`);
  
  try {
    // Write Java file
    const javaCode = `
      ${imports}
      
      public class ${className} {
        public static void main(String[] args) {
          System.out.println(${methodCall});
        }

        public static boolean isPrime(int num) {
          if (num <= 1) return false;
          if (num <= 3) return true;
          
          if (num % 2 == 0 || num % 3 == 0) return false;
          
          for (int i = 5; i * i <= num; i += 6) {
            if (num % i == 0 || num % (i + 2) == 0) return false;
          }
          
          return true;
        }
        
        public static double summation(double[] numbers) {
          double sum = 0;
          for (double number : numbers) {
            sum += number;
          }
          return sum;
        }
        
        public static int[] fibonacci(int n) {
          int[] sequence = new int[n];
          if (n > 0) sequence[0] = 0;
          if (n > 1) sequence[1] = 1;
          
          for (int i = 2; i < n; i++) {
            sequence[i] = sequence[i-1] + sequence[i-2];
          }
          
          return sequence;
        }
        
        public static int gcd(int a, int b) {
          while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
          }
          return a;
        }
        
        public static void quickSort(int[] arr, int low, int high) {
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
        }
        
        public static int countInRange(int[] data, int n) {
          if (data.length == 0) return 0;
          
          int first = data[0];
          int count = 0;
          
          for (int num : data) {
            if (num >= first && num <= n) {
              count++;
            }
          }
          
          return count;
        }
        
        public static String arrayToString(int[] arr) {
          if (arr == null || arr.length == 0) return "[]";
          
          StringBuilder sb = new StringBuilder("[");
          for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) {
              sb.append(", ");
            }
          }
          sb.append("]");
          return sb.toString();
        }
      }
    `;
    
    fs.writeFileSync(javaFilePath, javaCode);
    
    // Compile Java file
    execSync(`javac ${javaFilePath}`, { stdio: 'pipe' });
    
    // Execute Java class
    const output = execSync(`java -cp ${tempDir} ${className}`, { 
      stdio: 'pipe',
      encoding: 'utf-8'
    });
    
    return output.trim();
  } catch (error) {
    console.error('Error executing Java code:', error);
    throw new Error(`Failed to execute Java code: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    // Clean up files
    try {
      if (fs.existsSync(javaFilePath)) fs.unlinkSync(javaFilePath);
      if (fs.existsSync(classFilePath)) fs.unlinkSync(classFilePath);
    } catch (error) {
      console.error('Error cleaning up Java files:', error);
    }
  }
}

// Prime Number
export function isPrime(num: number): boolean {
  const result = executeJava('PrimeChecker', `isPrime(${num})`);
  return result === 'true';
}

// Summation
export function summation(numbers: number[]): number {
  const numbersArray = `new double[] {${numbers.join(', ')}}`;
  const result = executeJava('Summation', `summation(${numbersArray})`);
  return parseFloat(result);
}

// Fibonacci
export function fibonacci(n: number): number[] {
  const result = executeJava(
    'Fibonacci', 
    `arrayToString(fibonacci(${n}))`,
    'import java.util.Arrays;'
  );
  
  // Parse the array string [0, 1, 1, 2, ...] to an array of numbers
  const arrayString = result.substring(1, result.length - 1);
  if (!arrayString.trim()) return [];
  
  return arrayString.split(', ').map(Number);
}

// GCD
export function gcd(a: number, b: number): number {
  const result = executeJava('GCD', `gcd(${a}, ${b})`);
  return parseInt(result);
}

// QuickSort
export function quickSort(numbers: number[]): number[] {
  const className = 'QuickSortExecutor';
  const javaFilePath = path.join(tempDir, `${className}.java`);
  const classFilePath = path.join(tempDir, `${className}.class`);
  
  try {
    // Create a custom Java class for QuickSort
    const javaCode = `
      public class ${className} {
        public static void main(String[] args) {
          int[] arr = new int[] {${numbers.join(', ')}};
          quickSort(arr, 0, arr.length - 1);
          System.out.println(arrayToString(arr));
        }
        
        public static void quickSort(int[] arr, int low, int high) {
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
        }
        
        public static String arrayToString(int[] arr) {
          if (arr == null || arr.length == 0) return "[]";
          
          StringBuilder sb = new StringBuilder("[");
          for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) {
              sb.append(", ");
            }
          }
          sb.append("]");
          return sb.toString();
        }
      }
    `;
    
    fs.writeFileSync(javaFilePath, javaCode);
    
    // Compile and execute
    execSync(`javac ${javaFilePath}`, { stdio: 'pipe' });
    const output = execSync(`java -cp ${tempDir} ${className}`, { 
      stdio: 'pipe', 
      encoding: 'utf-8' 
    });
    
    // Parse the output array
    const result = output.trim();
    const arrayString = result.substring(1, result.length - 1);
    if (!arrayString.trim()) return [];
    
    return arrayString.split(', ').map(Number);
  } catch (error) {
    console.error('Error executing QuickSort in Java:', error);
    throw new Error(`Failed to execute QuickSort: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    // Clean up files
    try {
      if (fs.existsSync(javaFilePath)) fs.unlinkSync(javaFilePath);
      if (fs.existsSync(classFilePath)) fs.unlinkSync(classFilePath);
    } catch (error) {
      console.error('Error cleaning up Java files:', error);
    }
  }
}

// Count
export function countInRange(data: number[], n: number): number {
  const dataArray = `new int[] {${data.join(', ')}}`;
  const result = executeJava('Counter', `countInRange(${dataArray}, ${n})`);
  return parseInt(result);
}
