# XP Planner Financeiro 🚀

O **XP Planner Financeiro** é uma aplicação modular web-based projetada para ajudar usuários a gerenciarem sua saúde financeira. Com ele, é possível cadastrar rendas, despesas, organizar categorias e acompanhar a evolução de investimentos em renda fixa e variável.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** + **Shadcn UI**
- **MUI X Charts** (Gráficos interativos)
- **Axios** (Comunicação com API)

### Backend
- **Node.js** + **Express**
- **SQLite** (Banco de dados local)
- **Drizzle ORM** (Schema e manipulação de dados)
- **Zod** (Validação)

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
- **Node.js** (v18 ou superior)
- **npm** (ou yarn/pnpm)

### Passo 1: Clonar o Repositório
```bash
git clone <url-do-seu-repositorio>
cd XP
```

### Passo 2: Configurar o Backend
1. Navegue até a pasta backend:
   ```bash
   cd backend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Sincronize o banco de dados (SQLite):
   ```bash
   npx drizzle-kit push
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O backend estará rodando em `http://localhost:3001`*

### Passo 3: Configurar o Frontend
1. Em um novo terminal, navegue até a pasta frontend:
   ```bash
   cd ../frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O frontend estará acessível em `http://localhost:5173`*

---

## 🌐 Deploy na Vercel

O projeto está configurado para deploy automático na Vercel utilizando o arquivo `vercel.json` na raiz.

### Configurações de Build na Vercel:
- **Build Command:** `cd frontend && npm install && npm run build && cd ../backend && npm install`
- **Output Directory:** `frontend/dist`
- **Install Command:** `npm install`

### Variáveis de Ambiente (Opcional):
No dashboard da Vercel, você pode adicionar a seguinte variável para o Frontend:
- `VITE_API_URL`: `/api` (Isso fará com que o frontend use as rotas relativas da Vercel).

---

## 📖 Funcionalidades
- **Dashboard:** Visão geral de saldo, rendas e despesas com gráficos.
- **Cadastrar Atividades:** Registro de movimentações financeiras com sugestão automática de categoria.
- **Investimentos:** Cadastro de ativos com simulação de preços e cálculo de rendimento CDI.
- **Interface Moderna:** Design responsivo e limpo utilizando os padrões XP.

---
Desenvolvido como parte do desafio prático de Planejamento Financeiro.
