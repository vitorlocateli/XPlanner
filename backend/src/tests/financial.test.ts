import { calculateBalance, groupByCategory, calculateFixedIncomeEvolution, calculateVariableIncomeReturn, transactionSchema } from '../domain/financial';

describe('Financial Calculations', () => {
  it('should calculate the balance correctly', () => {
    const income = [
      { amount: 5000, type: 'fixed' },
      { amount: 1000, type: 'variable' },
    ];
    const expenses = [
      { amount: 2000, type: 'fixed' },
      { amount: 500, type: 'variable' },
    ];

    const balance = calculateBalance(income, expenses);

    expect(balance).toBe(3500);
  });

  it('should group expenses by category correctly', () => {
    const expenses = [
      { amount: 50, category: 'Food', name: 'Snack' },
      { amount: 100, category: 'Transport', name: 'Gasoline' },
      { amount: 30, category: 'Food', name: 'Lunch' },
    ];

    const grouped = groupByCategory(expenses);

    expect(grouped).toEqual({
      Food: 80,
      Transport: 100,
    });
  });

  it('should calculate fixed income evolution correctly', () => {
    const initialAmount = 1000;
    const annualRate = 0.12; // 12% per year
    const months = 12;

    const finalAmount = calculateFixedIncomeEvolution(initialAmount, annualRate, months);

    // Using compound interest: A = P(1 + r/n)^(nt)
    // For simplicity, let's assume monthly compounding: r = 0.12/12 = 0.01
    // A = 1000 * (1.01)^12 = 1000 * 1.126825 = 1126.83
    expect(finalAmount).toBeCloseTo(1126.83, 2);
  });

  it('should calculate variable income return correctly', () => {
    const initialPrice = 100;
    const currentPrice = 150;
    const quantity = 10;

    const totalReturn = calculateVariableIncomeReturn(initialPrice, currentPrice, quantity);

    expect(totalReturn).toBe(500); // (150 - 100) * 10
  });

  it('should validate a valid transaction correctly', () => {
    const validTransaction = {
      amount: 100,
      type: 'fixed',
      category: 'Food',
      name: 'Snack'
    };

    const result = transactionSchema.safeParse(validTransaction);
    expect(result.success).toBe(true);
  });

  it('should invalidate an invalid transaction', () => {
    const invalidTransaction = {
      amount: -100, // Amount should be positive
      type: 'fixed'
    };

    const result = transactionSchema.safeParse(invalidTransaction);
    expect(result.success).toBe(false);
  });
});
