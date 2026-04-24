import express from 'express';
import cors from 'cors';
import { financialController } from './controllers/financialController.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.get('/transactions', financialController.getTransactions);
app.post('/transactions', financialController.postTransaction);

app.get('/investments', financialController.getInvestments);
app.post('/investments', financialController.postInvestment);

app.get('/categories', financialController.getCategories);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

export default app;
