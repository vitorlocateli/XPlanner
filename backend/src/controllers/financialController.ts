import type { Request, Response } from 'express';
import { financialService } from '../services/financialService.js';

export const financialController = {
  async getTransactions(req: Request, res: Response) {
    const data = await financialService.getAllTransactions();
    res.json(data);
  },

  async postTransaction(req: Request, res: Response) {
    const data = await financialService.createTransaction(req.body);
    res.json(data);
  },

  async getInvestments(req: Request, res: Response) {
    const data = await financialService.getAllInvestments();
    res.json(data);
  },

  async postInvestment(req: Request, res: Response) {
    const data = await financialService.createInvestment(req.body);
    res.json(data);
  },

  async getCategories(req: Request, res: Response) {
    const data = await financialService.getCategories();
    res.json(data);
  }
};
