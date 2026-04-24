import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, TrendingUp } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import RegisterActivity from './pages/RegisterActivity';
import Investments from './pages/Investments';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-600">XP Planner</h1>
          </div>
          <nav className="mt-6">
            <Link to="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <LayoutDashboard className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link to="/register" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <PlusCircle className="w-5 h-5 mr-3" />
              Cadastrar atividades
            </Link>
            <Link to="/investments" className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <TrendingUp className="w-5 h-5 mr-3" />
              Acompanhar investimentos
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/register" element={<RegisterActivity />} />
            <Route path="/investments" element={<Investments />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
