import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export default function RegisterActivity() {
  const [activities, setActivities] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    type: 'variable', // Default to variable for momentary purchases
    kind: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    const res = await axios.get('http://localhost:3001/transactions');
    setActivities(res.data);
  };

  const suggestCategory = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('salgado') || n.includes('lanche') || n.includes('comida') || n.includes('restaurante')) return 'Alimentação';
    if (n.includes('gasolina') || n.includes('uber') || n.includes('onibus') || n.includes('metrô')) return 'Transporte';
    if (n.includes('cinema') || n.includes('jogo') || n.includes('show')) return 'Lazer';
    return '';
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const category = suggestCategory(name);
    setFormData({ ...formData, name, category: category || formData.category });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(`${API_URL}/transactions`, {
      ...formData,
      amount: parseFloat(formData.amount),
    });
    alert('Atividade cadastrada com sucesso!');
    setFormData({
      name: '',
      amount: '',
      type: 'fixed',
      kind: 'expense',
      category: '',
      date: new Date().toISOString().split('T')[0],
    });
    fetchActivities();
  };

  return (
    <div className="space-y-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cadastrar Atividade</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nome (ex: Salgado, Gasolina)</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={formData.name}
                onChange={handleNameChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  required
                />
              </div>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="fixed">Fixo</option>
                  <option value="variable">Variável</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Natureza</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  value={formData.kind}
                  onChange={(e) => setFormData({ ...formData, kind: e.target.value })}
                >
                  <option value="expense">Despesa</option>
                  <option value="income">Renda</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Categoria (Sugestão automática)</label>
              <input
                type="text"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Salvar Atividade
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Nome</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Valor</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Categoria</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Natureza</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {activities.map((act) => (
                  <tr key={act.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle font-medium">{act.name}</td>
                    <td className={`p-4 align-middle ${act.kind === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      R$ {parseFloat(act.amount).toLocaleString()}
                    </td>
                    <td className="p-4 align-middle">{act.category}</td>
                    <td className="p-4 align-middle">{act.kind === 'income' ? 'Renda' : 'Despesa'} ({act.type === 'fixed' ? 'Fixa' : 'Variável'})</td>
                    <td className="p-4 align-middle">{act.date}</td>
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
/table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
