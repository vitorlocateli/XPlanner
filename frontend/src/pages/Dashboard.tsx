import { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/transactions').then((res) => setData(res.data));
  }, []);

  const totalIncome = data
    .filter((t) => t.kind === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = data
    .filter((t) => t.kind === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renda Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {totalIncome.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Despesas Totais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {totalExpenses.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
              R$ {balance.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart
              xAxis={[{ scaleType: 'band', data: ['Performance'] }]}
              series={[
                { data: [totalIncome], label: 'Renda', color: '#22c55e' },
                { data: [totalExpenses], label: 'Despesas', color: '#ef4444' }
              ]}
              width={500}
              height={300}
            />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Distribuição</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: totalIncome, label: 'Renda', color: '#22c55e' },
                    { id: 1, value: totalExpenses, label: 'Despesas', color: '#ef4444' },
                  ],
                },
              ]}
              width={350}
              height={200}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
