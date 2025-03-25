import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Algorithm Results History
export const algorithmExecutions = pgTable("algorithm_executions", {
  id: serial("id").primaryKey(),
  algorithm: text("algorithm").notNull(),
  language: text("language").notNull(),
  input: text("input").notNull(),
  output: text("output").notNull(),
  executionTime: integer("execution_time").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertAlgorithmExecutionSchema = createInsertSchema(algorithmExecutions).pick({
  algorithm: true,
  language: true,
  input: true,
  output: true,
  executionTime: true,
  timestamp: true,
});

export type InsertAlgorithmExecution = z.infer<typeof insertAlgorithmExecutionSchema>;
export type AlgorithmExecution = typeof algorithmExecutions.$inferSelect;

// Input schemas for API endpoints
export const primeNumberSchema = z.object({
  number: z.number().int().positive(),
});

export const summationSchema = z.object({
  numbers: z.array(z.number()),
});

export const fibonacciSchema = z.object({
  n: z.number().int().positive(),
});

export const gcdSchema = z.object({
  a: z.number().int().positive(),
  b: z.number().int().positive(),
});

export const quickSortSchema = z.object({
  numbers: z.array(z.number().int()),
});

export const countSchema = z.object({
  data: z.array(z.number().int()),
  n: z.number().int(),
});
