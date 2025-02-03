import React from 'react';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import api from '../services/api';
import OrdersList from './components/OrdersList';
import CreateOrder from './components/CreateOrder';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function AIPrediction() {
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await api.post('/ai/predict', {
        product_type: 'RMU',
        complexity_factor: 1.1,
        total_material_count: 20
      });
      setResult(response.data.predicted_days);
    } catch (error) {
      console.error('AI tahmin hatası:', error);
      setResult('Error');
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handlePredict}>
        AI Tahmini Al
      </Button>
      {result !== null && (
        <Typography variant="h6">
          Tahmini Teslim Gün: {result}
        </Typography>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#1976d2', color: '#fff' }}>
        <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Giriş</Link>
        <Link to="/dashboard" style={{ color: '#fff', marginRight: '1rem' }}>Dashboard</Link>
        <Link to="/orders" style={{ color: '#fff' }}>Siparişler</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/new-order" element={<CreateOrder />} />
        <Route path="/welcome" element={<h1>Hoş Geldin!</h1>} />
        <Route path="/ai-prediction" element={<AIPrediction />} />
        {/* Diğer modüller için ek rotalar */}
      </Routes>
    </Router>
  );
}

export default App;
