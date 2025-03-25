// This file contains the same JavaScript implementations as the client-side
// but can be used server-side if needed

// Prime Number
export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
}

// Summation
export function summation(numbers: number[]): number {
  return numbers.reduce((sum, number) => sum + number, 0);
}

// Fibonacci
export function fibonacci(n: number): number[] {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const sequence = [0, 1];
  
  for (let i = 2; i < n; i++) {
    sequence[i] = sequence[i-1] + sequence[i-2];
  }
  
  return sequence;
}

// Greatest Common Divisor (GCD)
export function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// QuickSort
export function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Count Integers in Range
export function countInRange(data: number[], n: number): number {
  if (data.length === 0) return 0;
  
  const first = data[0];
  let count = 0;
  
  for (const num of data) {
    if (Number.isInteger(num) && num >= first && num <= n) {
      count++;
    }
  }
  
  return count;
}
