import { db } from '../db/index.js';
import { transactions, investments, categories } from '../db/schema.js';
import { eq } from 'drizzle-orm';

export const financialService = {
  async getAllTransactions() {
    return await db.select().from(transactions);
  },

  async createTransaction(data: any) {
    const result = await db.insert(transactions).values(data).returning();
    return result[0];
  },

  async getAllInvestments() {
    return await db.select().from(investments);
  },

  async createInvestment(data: any) {
    const result = await db.insert(investments).values(data).returning();
    return result[0];
  },

  async getCategories() {
    return await db.select().from(categories);
  },

  async createCategory(name: string) {
    const result = await db.insert(categories).values({ name }).returning();
    return result[0];
  }
};
