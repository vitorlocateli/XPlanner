import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const transactions = sqliteTable('transactions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  amount: real('amount').notNull(),
  type: text('type').notNull(), // 'fixed' or 'variable'
  category: text('category').notNull(),
  kind: text('kind').notNull(), // 'income' or 'expense'
  date: text('date').notNull(),
});

export const investments = sqliteTable('investments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  value: real('value').notNull(), // current value or initial amount
  quantity: real('quantity'), // for variable income
  type: text('type').notNull(), // 'fixed' or 'variable'
  yieldRate: real('yield_rate'), // e.g. 1.0 for 100% CDI
  date: text('date').notNull(),
});

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});
