import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive(),
  type: z.enum(['fixed', 'variable']).optional(),
  category: z.string().optional(),
  name: z.string().optional(),
});

export interface Transaction extends z.infer<typeof transactionSchema> {}

export function calculateBalance(income: Transaction[], expenses: Transaction[]): number {
  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  return totalIncome - totalExpenses;
}

export function groupByCategory(expenses: Transaction[]): Record<string, number> {
  return expenses.reduce((acc, curr) => {
    const category = curr.category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += curr.amount;
    return acc;
  }, {} as Record<string, number>);
}

export function calculateFixedIncomeEvolution(initialAmount: number, annualRate: number, months: number): number {
  const monthlyRate = annualRate / 12;
  return initialAmount * Math.pow(1 + monthlyRate, months);
}

export function calculateVariableIncomeReturn(initialPrice: number, currentPrice: number, quantity: number): number {
  return (currentPrice - initialPrice) * quantity;
}


