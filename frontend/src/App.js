import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrdersList from './components/OrdersList';
import CreateOrder from './components/CreateOrder';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Ana Sayfa</Link> |{" "}
        <Link to="/orders">Siparişler</Link>
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<h1>Hoş Geldin!</h1>} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/new-order" element={<CreateOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
