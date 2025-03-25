import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import * as javaAlgo from "./algorithms/java";
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
    const { number } = req.body;
    
    if (isNaN(number) || number <= 0) {
      return res.status(400).json({ error: "Invalid input: Please provide a positive integer" });
    }
    
    // Use Java implementation
    const result = javaAlgo.isPrime(number);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// Summation Handler
function handleSummation(req: Request, res: Response) {
  try {
    const { numbers } = req.body;
    
    if (!Array.isArray(numbers) || numbers.some(n => isNaN(n))) {
      return res.status(400).json({ error: "Invalid input: Please provide an array of numbers" });
    }
    
    // Use Java implementation
    const result = javaAlgo.summation(numbers);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// Fibonacci Handler
function handleFibonacci(req: Request, res: Response) {
  try {
    const { n } = req.body;
    
    if (isNaN(n) || n <= 0) {
      return res.status(400).json({ error: "Invalid input: Please provide a positive integer" });
    }
    
    // Use Java implementation
    const result = javaAlgo.fibonacci(n);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// GCD Handler
function handleGCD(req: Request, res: Response) {
  try {
    const { a, b } = req.body;
    
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
      return res.status(400).json({ error: "Invalid input: Please provide two positive integers" });
    }
    
    // Use Java implementation
    const result = javaAlgo.gcd(a, b);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// QuickSort Handler
function handleQuickSort(req: Request, res: Response) {
  try {
    const { numbers } = req.body;
    
    if (!Array.isArray(numbers) || numbers.some(n => isNaN(n))) {
      return res.status(400).json({ error: "Invalid input: Please provide an array of numbers" });
    }
    
    // Use Java implementation
    const result = javaAlgo.quickSort(numbers);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}

// Count Handler
function handleCount(req: Request, res: Response) {
  try {
    const { data, n } = req.body;
    
    if (!Array.isArray(data) || data.some(d => isNaN(d)) || isNaN(n)) {
      return res.status(400).json({ error: "Invalid input: Please provide an array of integers and an upper limit" });
    }
    
    // Use Java implementation
    const result = javaAlgo.countInRange(data, n);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
}
