import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function Investments() {
  const [investments, setInvestments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    quantity: '',
    type: 'fixed',
    yieldRate: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [loadingPrice, setLoadingPrice] = useState(false);

  useEffect(() => {
    fetchInvestments();
  }, []);

  const fetchInvestments = async () => {
    const res = await axios.get('http://localhost:3001/investments');
    setInvestments(res.data);
  };

  const fetchStockPrice = async () => {
    if (!formData.name) return;
    setLoadingPrice(true);
    // Em um cenário real, usaríamos a API do Yahoo Finance ou similar aqui.
    // Simulando busca de preço de fechamento/atual
    setTimeout(() => {
      const mockPrices: Record<string, number> = {
        'AAPL': 180.50,
        'PETR4': 35.20,
        'VALE3': 65.10,
        'IBOV': 128000,
      };
      const price = mockPrices[formData.name.toUpperCase()] || (Math.random() * 100 + 10).toFixed(2);
      setFormData({ ...formData, value: price.toString() });
      setLoadingPrice(false);
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${API_URL}/investments`, {
      ...formData,
      value: parseFloat(formData.value),
      quantity: formData.quantity ? parseFloat(formData.quantity) : null,
      yieldRate: formData.yieldRate ? parseFloat(formData.yieldRate) : null,
    });
    alert('Investimento cadastrado com sucesso!');
    setFormData({
      name: '',
      value: '',
      quantity: '',
      type: 'fixed',
      yieldRate: '',
      date: new Date().toISOString().split('T')[0],
    });
    fetchInvestments();
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Acompanhar Investimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2 items-end">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium">Ativo (ex: AAPL, CDB Pos)</label>
                <input
                  type="text"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              {formData.type === 'variable' && (
                <Button type="button" variant="outline" onClick={fetchStockPrice} disabled={loadingPrice}>
                  {loadingPrice ? 'Buscando...' : 'Buscar Preço'}
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="fixed">Renda Fixa</option>
                  <option value="variable">Renda Variável</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Valor Atual / Preço Cota</label>
                <input
                  type="number"
                  step="0.01"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {formData.type === 'variable' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantidade</label>
                  <input
                    type="number"
                    step="0.01"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Rendimento (% do CDI ou a.a)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={formData.yieldRate}
                    onChange={(e) => setFormData({ ...formData, yieldRate: e.target.value })}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium">Data</label>
                <input
                  type="date"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">Cadastrar Investimento</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Meus Investimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Ativo</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tipo</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Detalhes</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {investments.map((inv) => (
                  <tr key={inv.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{inv.name}</td>
                    <td className="p-4 align-middle">{inv.type === 'variable' ? 'Variável' : 'Fixa'}</td>
                    <td className="p-4 align-middle">
                      {inv.type === 'variable' ? `${inv.quantity} un @ R$ ${inv.value}` : `R$ ${inv.value} (${inv.yieldRate}% a.a)`}
                    </td>
                    <td className="p-4 align-middle">{inv.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
