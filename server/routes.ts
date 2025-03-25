import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// Import only JavaScript algorithms since Java is not available in the deployment environment
import * as jsAlgo from "./algorithms/javascript";

export async function registerRoutes(app: Express): Promise<Server> {
  // Algorithm routes
  app.post("/api/algorithms/prime", handlePrime);
  app.post("/api/algorithms/summation", handleSummation);
  app.post("/api/algorithms/fibonacci", handleFibonacci);
  app.post("/api/algorithms/gcd", handleGCD);
  app.post("/api/algorithms/quicksort", handleQuickSort);
  app.post("/api/algorithms/count", handleCount);
  
  const httpServer = createServer(app);
  return httpServer;
}

// Prime Number Handler
function handlePrime(req: Request, res: Response) {
  try {
    const { number, implementation } = req.body;
    
    if (isNaN(number) || number <= 0) {
      return res.status(400).json({ error: "Invalid input: Please provide a positive integer" });
    }
    
    // Always use JavaScript implementation
    const startTime = performance.now();
    const result = jsAlgo.isPrime(number);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    res.json({ 
      result, 
      executionTime,
      // If Java was requested, inform client we're using JS instead
      note: implementation === 'java' ? 'Java implementation not available in deployment environment. Using JavaScript instead.' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// Summation Handler
function handleSummation(req: Request, res: Response) {
  try {
    const { numbers, implementation } = req.body;
    
    if (!Array.isArray(numbers) || numbers.some(n => isNaN(n))) {
      return res.status(400).json({ error: "Invalid input: Please provide an array of numbers" });
    }
    
    // Always use JavaScript implementation
    const startTime = performance.now();
    const result = jsAlgo.summation(numbers);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    res.json({ 
      result, 
      executionTime,
      note: implementation === 'java' ? 'Java implementation not available in deployment environment. Using JavaScript instead.' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// Fibonacci Handler
function handleFibonacci(req: Request, res: Response) {
  try {
    const { n, implementation } = req.body;
    
    if (isNaN(n) || n <= 0) {
      return res.status(400).json({ error: "Invalid input: Please provide a positive integer" });
    }
    
    // Always use JavaScript implementation
    const startTime = performance.now();
    const result = jsAlgo.fibonacci(n);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    res.json({ 
      result, 
      executionTime,
      note: implementation === 'java' ? 'Java implementation not available in deployment environment. Using JavaScript instead.' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// GCD Handler
function handleGCD(req: Request, res: Response) {
  try {
    const { a, b, implementation } = req.body;
    
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      return res.status(400).json({ error: "Invalid input: Please provide two positive integers" });
    }
    
    // Always use JavaScript implementation
    const startTime = performance.now();
    const result = jsAlgo.gcd(a, b);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    res.json({ 
      result, 
      executionTime,
      note: implementation === 'java' ? 'Java implementation not available in deployment environment. Using JavaScript instead.' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// QuickSort Handler
function handleQuickSort(req: Request, res: Response) {
  try {
    const { numbers, implementation } = req.body;
    
    if (!Array.isArray(numbers) || numbers.some(n => isNaN(n))) {
      return res.status(400).json({ error: "Invalid input: Please provide an array of numbers" });
    }
    
    // Always use JavaScript implementation
    const startTime = performance.now();
    const result = jsAlgo.quickSort([...numbers]); // Clone to avoid mutation
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    res.json({ 
      result, 
      executionTime,
      note: implementation === 'java' ? 'Java implementation not available in deployment environment. Using JavaScript instead.' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// Count Handler
function handleCount(req: Request, res: Response) {
  try {
    const { data, n, implementation } = req.body;
    
    if (!Array.isArray(data) || data.some(d => isNaN(d)) || isNaN(n)) {
      return res.status(400).json({ error: "Invalid input: Please provide an array of integers and an upper limit" });
    }
    
    // Always use JavaScript implementation
    const startTime = performance.now();
    const result = jsAlgo.countInRange(data, n);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    
    res.json({ 
      result, 
      executionTime,
      note: implementation === 'java' ? 'Java implementation not available in deployment environment. Using JavaScript instead.' : undefined
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}
